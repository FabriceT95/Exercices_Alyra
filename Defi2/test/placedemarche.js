const { BN, ether } = require('@openzeppelin/test-helpers');
const {expect} = require('chai');
const placeDeMarche = artifacts.require('PlaceDeMarche');

contract ('PlaceDeMarche', function (accounts) {
    const owner = accounts[0];
    const recipient = accounts[1];
    const company = accounts[4];
    const name = "MJ";
    const newUser = accounts[3];
    // const status =  {ouverte:OUVERTE, encours:ENCOURS, fermee:FERMEE};
    const minReputation = 1;
    const travail = "http://localhost:5000";
    const status = {
        Ouverte : 0,
        EnCours : 1,
        Termine : 2
    };
    const amount = ether("1");
    const demande = {entreprise:company, nomOffre:"Joconde",remuneration:100,depot:102, delay:10,description:"LA JOCONDE", status:status.Ouverte, minReputation:minReputation,candidates:[],illustrateurChoisi:"", travail:"" };
    beforeEach(async function () {
        this.PDMInstance = await placeDeMarche.new({from : owner});
    });

    it('ajoute un nouvel admin', async function () {
        let arrayAdminBefore = await this.PDMInstance.getAdminLength();
        await this.PDMInstance.addAdmin(recipient, {from:owner});

        let arrayAdminAfter = await this.PDMInstance.getAdminLength();

        expect(Number(arrayAdminAfter)).to.equal(Number(arrayAdminBefore)+1);


    });

    it('ajoute une nouvelle entreprise', async function () {
        let arrayCompanyBefore = await this.PDMInstance.getCompaniesLength();

        await this.PDMInstance.inscriptionCompany({from:company});

        let arrayCompanyAfter = await this.PDMInstance.getCompaniesLength();

        expect(Number(arrayCompanyAfter)).to.equal(Number(arrayCompanyBefore)+1);
    });

    it('inscrit un nouvel illustrateur', async function () {
        await this.PDMInstance.inscription(name, {from:newUser});

        let userToNameAfter = await this.PDMInstance.userToName.call(newUser);
        let userToReputationAfter = await this.PDMInstance.userToReputation.call(newUser);
        let usersAfter = await this.PDMInstance.users.call(newUser);

        expect(Number(userToReputationAfter)).to.equal(1);
        expect(userToNameAfter).to.equal(name);
        expect(usersAfter).to.equal(true);
    });


    it('ajoute une demande', async function () {
        // On ajoute l'entreprise au tableau car on a besoin d'avoir cette entreprise dans le tableau pour pourvoir poursuivre le test
        await this.PDMInstance.inscriptionCompany({from:company});
        await this.PDMInstance.ajouterDemande(demande.remuneration,demande.delay, demande.description, demande.minReputation, demande.nomOffre, {from:company, value:amount});

        let getDemande = await this.PDMInstance.getDemande(0);

        expect(getDemande.addressCompany).to.equal(company);
        //expect(Number(getDemande.remuneration)).to.equal(Number(demande.remuneration));
        expect(getDemande.depot).to.be.bignumber.equal(amount);
        //expect(Math.trunc(Number(getDemande.delay)/100)).to.equal(Math.trunc((demande.delay + Date.now())/100000));
        expect(getDemande.description).to.equal(demande.description);
        expect(Number(getDemande.status)).to.equal(0);
        expect(Number(getDemande.minReputation)).to.equal(demande.minReputation);
        //expect(Number(getDemande.id)).to.equal(0);

    });

    it('postule', async function () {
        await this.PDMInstance.inscription(name, {from:newUser});
        // On ajoute l'entreprise au tableau car on a besoin d'avoir cette entreprise dans le tableau pour pourvoir poursuivre le test
        await this.PDMInstance.inscriptionCompany({from:company});
        await this.PDMInstance.ajouterDemande(demande.remuneration,demande.delay, demande.description, demande.minReputation, demande.nomOffre, {from:company, value:amount});

        await this.PDMInstance.postuler(0, {from:newUser});

        let getDemande = await this.PDMInstance.getDemande(0);

        expect(getDemande.candidates[0]).to.equal(newUser);

    });

    it('accepte offre', async function () {
        let amount = ether("1");
        await this.PDMInstance.inscription(name, {from:newUser});
        await this.PDMInstance.inscriptionCompany({from:company});
        await this.PDMInstance.ajouterDemande(demande.remuneration,demande.delay, demande.description, demande.minReputation, demande.nomOffre, {from:company, value:amount});
        await this.PDMInstance.postuler(0, {from:newUser});

        await this.PDMInstance.accepterOffre(0, newUser, {from:company});

        let getDemande = await this.PDMInstance.getDemande(0);

        expect(getDemande.illustrateurChoisi).to.equal(newUser);
        expect(Number(getDemande.status)).to.equal(1);
        expect(Number(getDemande.candidates.length)).to.equal(0);

    });

    it('livre oeuvre', async function () {

        await this.PDMInstance.inscription(name, {from:newUser});
        await this.PDMInstance.inscriptionCompany({from:company});
        await this.PDMInstance.ajouterDemande(demande.remuneration,demande.delay, demande.description, demande.minReputation, demande.nomOffre, {from:company, value:amount});
        await this.PDMInstance.postuler(0, {from:newUser});
        await this.PDMInstance.accepterOffre(0, newUser, {from:company});

        let userToReputationBefore = await this.PDMInstance.userToReputation.call(newUser);

        await this.PDMInstance.livraison(0, travail, {from:newUser});

        let getDemande = await this.PDMInstance.getDemande(0);
        let userToReputationAfter= await this.PDMInstance.userToReputation.call(newUser);

        expect(getDemande.travail).to.equal(web3.utils.soliditySha3(travail));
        expect(Number(getDemande.status)).to.equal(2);
        expect(Number(userToReputationAfter)).to.equal(Number(userToReputationBefore)+1);


    });

    it('est en retard', async function () {

        await this.PDMInstance.inscription(name, {from:newUser});
        await this.PDMInstance.inscriptionCompany({from:company});
        await this.PDMInstance.ajouterDemande(demande.remuneration,demande.delay, demande.description, demande.minReputation, demande.nomOffre, {from:company, value:amount});
        await this.PDMInstance.postuler(0, {from:newUser});
        await this.PDMInstance.accepterOffre(0, newUser, {from:company});

        let userToReputationBefore = await this.PDMInstance.userToReputation.call(newUser);

        await this.PDMInstance.retard(0);

        let userToReputationAfter= await this.PDMInstance.userToReputation.call(newUser);

        expect(Number(userToReputationAfter)).to.equal(Number(userToReputationBefore)-1);

    });

    it('est banni', async function () {

        await this.PDMInstance.inscription(name, {from:newUser});

        await this.PDMInstance.banned(newUser, {from:owner});

        let userToReputationAfter= await this.PDMInstance.userToReputation.call(newUser);
        let blackListAfter = await this.PDMInstance.blackList.call(newUser);

        expect(blackListAfter).to.be.true;
        expect(Number(userToReputationAfter)).to.equal(0);

    });





});
