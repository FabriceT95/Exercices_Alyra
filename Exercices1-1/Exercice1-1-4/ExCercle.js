let Cercle = class Cercle {
	constructor(rayon){
		this.rayon = rayon;
	}

	aire(){
		return Math.PI * Math.pow(this.rayon, 2);
	}

	perimetre(){
		return 2 * Math.PI * this.rayon;
	}
}
