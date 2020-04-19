class Noeud {
    constructor(val) {
        this.valeur = val;
        this.gauche = undefined;
        this.droite = undefined;
        this.parent = undefined;
    }
    ajouterNoeud(v) {
        if (v<this.valeur){
            if (this.gauche !== undefined)
                    this.gauche.ajouterNoeud(v)
            else {
                this.gauche = new Noeud(v)
                this.gauche.parent = this
            }

        }

      if (v>this.valeur) {
        if (this.droite !== undefined)
                this.droite.ajouterNoeud(v)
        else {
            this.droite = new Noeud(v)
            this.droite.parent = this
        }
     }
    }
    trouverNoeud(v){
        if (this.valeur == v)
            return this
        else {
            if (this.valeur<v)
                if (this.droite !== undefined)
                    return this.droite.trouverNoeud(v)
                else 
                    return undefined
            else 
                if (this.gauche !== undefined)
                return this.gauche.trouverNoeud(v)
            else 
                return undefined
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

    // Affiche la valeur du noeud et la valeur de ses deux enfants et de son parent
    toString() {
        var out = "Noeud " + this.valeur + ":  L";
        
        this.gauche === undefined ? out += "-" : out += this.gauche.valeur;
        out += " R";
        
        this.droite === undefined ? out += "-" : out += this.droite.valeur;
        out += " P";
        
        this.parent === undefined ? out += "-" : out += this.parent.valeur;
        console.log(out);
    }
}
class Arbre {
    constructor() {
        this.racine = undefined;
    }
    
    //Méthode pour trouver une valeur donnée dans un arbre binaire de recherche
    trouverNoeud(valeur) {
        if (this.racine !== undefined)
            return this.racine.trouverNoeud(valeur)
        else
            return undefined
    }
    
    //Méthode pour ajouter un noeud
    ajouterNoeud(valeur) {
        if (this.racine !== undefined)
            this.racine.ajouterNoeud(valeur)
        else 
            this.racine = new Noeud(valeur)
    }
    
    //Méthode pour supprimer un noeud
    supprimerNoeud(valeur) {
    }
    
    //Méthode pour afficher l’arbre selon un parcours infixe
    //Cette méthode doit retournée un tableau contenant la valeur des noeuds
    infixe() {
        if (this.racine !== undefined)
            return this.racine.affichageInfixe()
        return []
    }
    
    //Méthode pour afficher la valeur d'un noeud à partir de sa valeur
    printNoeud (valeur) {
        let noeud = this.trouverNoeud(valeur);
        if (noeud !== undefined) noeud.toString();
    }
}

let monArbre = new Arbre()

monArbre.ajouterNoeud(6)
monArbre.ajouterNoeud(7)
monArbre.ajouterNoeud(3)
monArbre.ajouterNoeud(9)

console.log("trouver noeud 6:", monArbre.trouverNoeud(6))
monArbre.printNoeud(6)

