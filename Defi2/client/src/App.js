import React, {Component} from 'react';
import PlaceDeMarche from './contracts/PlaceDeMarche.json';
import getWeb3 from './getWeb3';
import web3 from "web3";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';


class App extends Component {
    state = {web3: null, accounts: null, contract: null};

    componentDidMount = async () => {
        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3();
            //console.log(web3);

            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();

            // Get the contract instance.
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = PlaceDeMarche.networks[networkId];
            const instance = new web3.eth.Contract(
                PlaceDeMarche.abi,
                deployedNetwork.address
            );

            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            this.setState({web3, accounts, contract: instance});
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`
            );
            console.error(error);
        }
    };

    render() {
        if (!this.state.web3) {
            return <div>Loading Web3, accounts, and contract...</div>;
        }
        return (
            <Header state={this.state}/>

        );
    }
}

export default App;

class Header extends React.Component {
    constructor(props) {
        super(props);
        // State of web3, accounts, and contract
        this.state2 = props.state;
    }

    render() {
        return (
            <>
                <Router>
                    <div>
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <a className="navbar-brand" href="/">
                                PLACE DE MARCHE
                            </a>
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-toggle="collapse"
                                data-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul class="navbar-nav mr-auto">


                                    <li className="nav-item active">
                                        <a className="nav-link">
                                            <Link to="/">Inscription Illustrateur</Link>
                                        </a>
                                    </li>

                                    <li className="nav-item">
                                        <a className="nav-link">
                                            <Link to="/inscription_entreprise">Inscription Entreprise</Link>
                                        </a>
                                    </li>

                                    <li className="nav-item">
                                        <a className="nav-link">
                                            <Link to="/offres">Offres disponibles</Link>
                                        </a>
                                    </li>

                                    <li className="nav-item">
                                        <a className="nav-link">
                                            <Link to="/mesOffres">Les offres de mon entreprise</Link>
                                        </a>
                                    </li>

                                    <li className="nav-item">
                                        <a className="nav-link">
                                            <Link to="/livraison"> Livraison </Link>
                                        </a>
                                    </li>

                                    <li className="nav-item">
                                        <a className="nav-link">
                                            <Link to="/signal"> Signalement </Link>
                                        </a>
                                    </li>

                                </ul>
                            </div>
                        </nav>

                        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                        <Switch>
                            <Route exact path="/inscription_entreprise">
                                <Inscription_entreprise state={this.state2}/>
                            </Route>
                            <Route exact path="/">
                                <Inscription_Illustrateur state={this.state2}/>
                            </Route>
                            <Route exact path="/offres">
                                <Offres state={this.state2}/>
                            </Route>
                            <Route exact path="/livraison">
                                <Livraison state={this.state2}/>
                            </Route>
                            <Route exact path="/mesOffres">
                                <Offres_entreprise state={this.state2}/>
                            </Route>
                        </Switch>
                    </div>
                </Router>
                <div style={{display: 'block'}}>
                    <ModalAddOffre state={this.state2}/>
                </div>
            </>

        );
    }
}

class Inscription_Illustrateur extends React.Component {
    constructor(props) {
        super(props);
        this.state2 = props.state;
    }

    AddIllustrateur = async (nomIllustrateur) => {
        const {contract, accounts} = this.state2;
        await contract.methods
            .inscription(nomIllustrateur)
            .send({from: accounts[0]});
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                const name = this.name.value;
                                this.AddIllustrateur(name);
                            }}
                        >
                            <div className="form-group">
                                <label htmlFor="name">Votre nom</label>
                                <input
                                    id="nameIllustrateur"
                                    type="text"
                                    ref={(input) => {
                                        this.name = input;
                                    }}
                                    className="form-control"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

class Inscription_entreprise extends React.Component {
    constructor(props) {
        super(props);
        this.state2 = props.state;
    }

    addCompany = async () => {
        const {contract, accounts} = this.state2;
        await contract.methods
            .inscriptionCompany()
            .send({from: accounts[0]});  //NB on ne peut s'incrire que du compte 0 metamask
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <div className="form-group">
                            <label htmlFor="name">Submit votre adresse d'entreprise</label>
                        </div>
                        <button onClick={this.addCompany} className="btn btn-primary">
                            Submit
                        </button>

                    </div>
                </div>
            </div>
        );
    }
}

class Offres extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            arrayOpenOffres: [],
            arrayOffres: []
        };
        this.state2 = props.state;
    }


    getOffres = async () => {
        const {contract, accounts} = this.state2;
        let arrayOffres = await contract.methods.getAllDemandes().call();
        let arrayOpenOffres = [];
        for (let i = 0; i < arrayOffres.length; i++) {
            if (arrayOffres[i].status == 0) {
                arrayOpenOffres.push(arrayOffres[i]);
            }
        }
        //this.arrayOpenOffres.map(offre => console.log(offre.id));


        this.setState({arrayOffres: arrayOffres, arrayOpenOffres: arrayOpenOffres});

    };

    postulerOffre = async (idDemande) => {
        const {contract, accounts} = this.state2;
        await contract.methods.postuler(idDemande).send({from: accounts[0]});

    };

    componentDidMount() {
        this.getOffres();
    }


    render() {
        return (
            <>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Identifiant de l'offre</th>
                        <th scope="col">Adresse de l'entreprise</th>
                        <th scope="col">Nom de l'offre</th>
                        <th scope="col">Remunération</th>
                        <th scope="col">Dépôt</th>
                        <th scope="col">Délais</th>
                        <th scope="col">Description</th>
                        <th scope="col">Réputation Minimale</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.arrayOpenOffres.map(offre =>
                            <tr>
                                <td scope="row">{offre.id}</td>
                                <td>{offre.addressCompany}</td>
                                <td>{offre.nomOffre}</td>
                                <td>{offre.remuneration}</td>
                                <td>{offre.depot}</td>
                                {/* VOIR LA DATE */}
                                <td>{offre.delay}</td>
                                <td>{offre.description}</td>
                                <td>{offre.minReputation}</td>
                                <td><input className="btn btn-primary" type="button" value="Postuler"
                                           onClick={() => this.postulerOffre(offre.id)}/></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </>


        );
    }
}

class Livraison extends React.Component {

    constructor(props) {
        super(props);
        this.state = {arrayOffres: [], arrayALivrer: []};
        // State of web3, accounts, and contract
        this.state2 = props.state;
    }

    displayTravailALivrer = async () => {
        const {contract, accounts} = this.state2;
        let arrayOffres = await contract.methods.getAllDemandes().call();
        let arrayALivrer = [];
        for (let i = 0; i < arrayOffres.length; i++) {
            if (arrayOffres[i].illustrateurChoisi == accounts[0] && arrayOffres[i].status == 1) {
                arrayALivrer.push(arrayOffres[i]);
            }
        }
        //this.arrayOpenOffres.map(offre => console.log(offre.id));
        this.setState({arrayOffres: arrayOffres, arrayALivrer: arrayALivrer});
    };


    livrerTravail = async (demandeId, URL_travail) => {
        const {contract, accounts} = this.state2;
        await contract.methods
            .livraison(demandeId, URL_travail)
            .send({from: accounts[0]});  //NB on ne peut s'incrire que du compte 0 metamask
        this.displayTravailALivrer();
    };

    componentDidMount() {
        this.displayTravailALivrer();
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <form onSubmit={(event) => {
                            event.preventDefault();
                            const URL_travail = this.URL_travail.value;
                            const demandeId = this.demandeId.value;
                            this.livrerTravail(demandeId, URL_travail);
                        }}>
                            <div className="form-group">
                                <label htmlFor="idOffre">ID de l'Offre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="idOffre"
                                    ref={(input) => {
                                        this.demandeId = input;
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="URL_travail">
                                    URL du travail (Accepte uniquement les URLs)
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="URL_travail"
                                    ref={(input) => {
                                        this.URL_travail = input;
                                    }}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <table className="table">
                        <thead>
                        <tr>

                            <th scope="col">Identifiant</th>
                            <th scope="col">addressCompany</th>
                            <th scope="col">nomOffre</th>
                            <th scope="col">remu</th>
                            <th scope="col">delay</th>
                            <th scope="col">description</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.arrayALivrer.map(offre =>
                                <tr>
                                    <td scope="row">{offre.id}</td>
                                    <td>{offre.addressCompany}</td>
                                    <td>{offre.nomOffre}</td>
                                    <td>{offre.remuneration}</td>
                                    {/* VOIR LA DATE */}
                                    <td>{offre.delay}</td>
                                    <td>{offre.description}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

class ModalAddOffre extends React.Component {

    constructor(props) {
        super(props);
        this.state2 = props.state;
        this.nomOffre = React.createRef();
        this.descriptionOffre = React.createRef();
        this.delais = React.createRef();
        this.remuneration = React.createRef();
        this.reputation = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    addOffre = async (Remuneration, Delais, descriptionOffre, Reputation, nomOffre) => {
        const {contract, accounts} = this.state2;
        let amount = Remuneration * 1.02;
        let remunerationEnEther = web3.utils.toWei(Remuneration.toString(), "ether");
        const DelaisSeconds = parseInt(Delais) * 24 * 60 * 60;
        await contract.methods.ajouterDemande(remunerationEnEther, DelaisSeconds, descriptionOffre, Reputation, nomOffre).send({from: accounts[0], value: web3.utils.toWei(amount.toString(), "ether")});
    };

    handleSubmit(e) {
        e.preventDefault();
        const nomOffre = this.nomOffre.current.value;
        const descriptionOffre = this.descriptionOffre.current.value;
        const delais = this.delais.current.value;
        const remuneration = this.remuneration.current.value;
        const reputation = this.reputation.current.value;

        this.addOffre(remuneration, delais, descriptionOffre, reputation, nomOffre);
    }

    render() {
        return (
            <>
                <div class="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalLongTitle" aria-hidden="false">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm">
                                            <form onSubmit={this.handleSubmit}>
                                                <div className="form-group">
                                                    <label htmlFor="nomOffre">Nom de l'offre</label>
                                                    <input
                                                        id="nomOffre"
                                                        type="text"
                                                        ref={this.nomOffre}
                                                        className="form-control"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="descriptionOffre">Description de l'offre</label>

                                                    <input
                                                        id="descriptionOffre"
                                                        type="text"
                                                        ref={this.descriptionOffre}
                                                        className="form-control"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="Delais">Délais (en jours, à partir de maintenant)</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="Delais"
                                                        ref={this.delais}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="Remuneration">Rémunération</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="Remuneration"
                                                        ref={this.remuneration}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="Reputation">Réputation demandée</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="Reputation"
                                                        ref={this.reputation}
                                                    />
                                                </div>
                                                <button type="submit" className="btn btn-primary">
                                                    Submit
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}

class Offres_entreprise extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayOffresEntreprise: [],
        };
        this.state2 = props.state;
    }

    displayOffresEntreprise = async () => {
        const {contract, accounts} = this.state2;
        let arrayOffres = await contract.methods.getAllDemandes().call();
        let arrayOffresEntreprise = [];
        for (let i = 0; i < arrayOffres.length; i++) {
            if (arrayOffres[i].addressCompany === accounts[0]) {
                arrayOffresEntreprise.push(arrayOffres[i]);
            }
        }
        this.setState({arrayOffresEntreprise: arrayOffresEntreprise})
    };

    accepterCandidat = async (idDemande, candidat) => {
        const {contract, accounts} = this.state2;
        await contract.methods.accepterOffre(idDemande, candidat).send({from: accounts[0]});
        this.displayOffresEntreprise();
    };

    retard = async(idDemande) => {
        const { contract } = this.state2;
        await contract.methods.retard(idDemande).send();
    };

    componentDidMount() {
        this.displayOffresEntreprise();
    }

    render() {
        return (<>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
                    Ajouter une offre
                </button>
                <table className="table">
                    <thead>
                    <tr>

                        <th scope="col">Identifiant</th>
                        <th scope="col">Status</th>
                        <th scope="col">Nom de l'offre</th>
                        <th scope="col">Rémunération</th>
                        <th scope="col">Dépôt</th>
                        <th scope="col">Délais</th>
                        <th scope="col">Description</th>
                        <th scope="col">Réputation Minimale</th>
                        <th scope="col">Candidats</th>
                        <th scope="col">Illustrateur Choisi</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.arrayOffresEntreprise.map(offre =>
                            <tr>
                                <td scope="row">{offre.id}</td>
                                <td>{offre.status}</td>
                                <td>{offre.nomOffre}</td>
                                <td>{offre.remuneration}</td>
                                <td>{offre.depot}</td>
                                {/* VOIR LA DATE */}
                                <td>{offre.delay}</td>
                                <td>{offre.description}</td>
                                <td>{offre.minReputation}</td>
                                <td>
                                    <ul className="list-group">
                                        {offre.candidates.map(candidat => <li class="list-group-item">{candidat}
                                                <button type="button" className="btn btn-info"
                                                        onClick={() => this.accepterCandidat(offre.id, candidat)}><span
                                                    className="glyphicon glyphicon-ok"></span></button>
                                            </li>
                                        )}
                                    </ul>
                                </td>
                                <td style={{textAlign:'center'}}>
                                    {offre.illustrateurChoisi != 0x0000000000000000000000000000000000000000 ? (
                                        offre.illustrateurChoisi
                                    ) : (
                                        <span>/</span>
                                    )}
                                    {offre.delay < Date() &&  offre.illustrateurChoisi != 0x0000000000000000000000000000000000000000 ?
                                        <button type="button" className="btn btn-info"
                                        onClick={() => this.retard(offre.id)}><span>Retard</span></button> : ""
                                    }
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </>
        );
    }
}
