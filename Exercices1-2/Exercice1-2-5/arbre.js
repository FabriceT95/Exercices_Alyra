class Noeud {
	constructor(valeur){
		this.valeur = valeur;
		this.gauche = undefined;
		this.droite = undefined;
	}

	ajouterValeur(valeur){
		if(this.gauche === undefined){
			this.gauche = new Noeud(valeur);
		}else {
			if(this.droite === undefined){
				this.droite = new Noeud(valeur);
			}else{
				this.gauche.ajouterValeur(valeur);
			}
		}
	}

	AfficherNoeud() {
        console.log(this.valeur)
        if (this.gauche) this.gauche.afficherValeur()
        if (this.droite) this.droite.afficherValeur()
    }
}

class Arbre {
	constructor(valeur){
		this.racine = new Noeud(valeur);
	}
	ajouterValeur(valeur){
		this.racine.ajouterValeur(valeur);
	}
	afficherArbre(){
		this.racine.AfficherNoeud()

	}

}

var monArbre = new Arbre(15)

//monArbre.afficherArbre();

monArbre.ajouterValeur(12);
monArbre.ajouterValeur(20);
monArbre.ajouterValeur(10);
monArbre.ajouterValeur(16);
monArbre.ajouterValeur(21);

monArbre.afficherArbre();
 