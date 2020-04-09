class Noeud {
    constructor(valeur) {
      this.valeur = valeur
      this.gauche = undefined
      this.droite = undefined
    }

    ajouterValeur(v){
        if (v<this.valeur){
            if (this.gauche === undefined){
                this.gauche = new Noeud(v)
            } else {
                this.gauche.ajouterValeur(v)
            }
        } else {
            if (this.droite === undefined){
                this.droite = new Noeud(v)
            } else {
                this.droite.ajouterValeur(v)
            }
        }
    }

    trouver_noeud(valeur){
       /* if(typeof(this.valeur) == undefined){
             console.log("cette valeur n'existe pas!")
             return null;
        }*/
        if(valeur == this.valeur){
            return this;
        }
        if(valeur < this.valeur){
            return this.gauche.trouver_noeud(valeur);
        }else if(valeur > this.valeur){
            return this.droite.trouver_noeud(valeur);
        }
    }


    affichageInfixe(){
        let affichage = []
        if(this.gauche !== undefined)
            affichage = this.gauche.affichageInfixe()
        affichage.push(this.valeur)
        if (this.droite !== undefined)
            affichage = affichage.concat(this.droite.affichageInfixe())        
        return affichage   
    } 
}
   
class Arbre {
    constructor(valeur) {
        this.racine = new Noeud(valeur)
    }

    ajouterValeur(valeur) {
        this.racine.ajouterValeur(valeur)
    }

    affichageInfixe(){
        if (this.racine !== undefined)
            return this.racine.affichageInfixe()
        return []
    }

    afficherArbre() {
        this.racine.afficherValeur()
    }

    trouver_noeud(valeur){
        if(this.racine !== undefined){
            return this.racine.trouver_noeud(valeur);
        }
    }

    
    
}

let monArbre = new Arbre(6)

console.log(monArbre)

monArbre.ajouterValeur(4)
monArbre.ajouterValeur(7)
monArbre.ajouterValeur(9)
monArbre.ajouterValeur(1)

monArbre.ajouterValeur(12)
monArbre.ajouterValeur(8)
monArbre.ajouterValeur(3)

console.log(monArbre)
console.log(monArbre.affichageInfixe())

// On cherche le noeud avec la valeur 8
// Problème actuel : bug sur le "undefined"
console.log("Noeud demandé : ", monArbre.trouver_noeud(8))