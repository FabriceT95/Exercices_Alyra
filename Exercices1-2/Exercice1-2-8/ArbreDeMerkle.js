const crypto = require('crypto')

// Récupération des n arguments en ligne de commande
let args = process.argv.slice(2);

let mainHashedWords = [];
let hashedFirstWave = [];

// On hash d'abord chaque message
function hashFirstWave(args){
	for(i = 0; i<args.length; i++){
		let hash = crypto.createHash('sha256').update(args[i]).digest('hex');
		hashedFirstWave.push(hash)		
	}
	return hashedFirstWave	
}

// On hash le contenu de "firstPreviousWave"
function doubleHash(firstPreviousWave){
	tabNewWave = []

	// Si le tableau à hasher ne contient pas plus de 1 valeur, on arrête
	if(firstPreviousWave.length > 1){
		

		for(i = 0; i<firstPreviousWave.length;i++){
			// Si on peut avoir une paire d'élement, on hash les deux éléments
			if(firstPreviousWave[i+1] != undefined){
				let hash = crypto.createHash('sha256').update(firstPreviousWave[i]+firstPreviousWave[i+1]).digest('hex');
				tabNewWave.push(hash);		
				i+=1;
			// Si c'est le dernier élément du tableau, et pas de pair, on fait le hash de sa valeur
			}else{
				let hash = crypto.createHash('sha256').update(firstPreviousWave[i]).digest('hex');
				tabNewWave.push(hash);
			}
		}
		// Pour respecter la représentation de l'arbre de merkle, le hashage se fait de la droite vers la gauche
		mainHashedWords.unshift(tabNewWave);

		// On rappelle la fonction pour hasher ce que l'on vient de hasher
		doubleHash(tabNewWave);
	}else{
		return;		
	}
}
mainHashedWords.push(hashFirstWave(args));
doubleHash(mainHashedWords[0]);

console.log(mainHashedWords)



/*

function preuve(message){
 	let hashMessageAChercher = StringExists(message)
}

function StringExists(message){
	let hash = crypto.createHash('sha256').update(message).digest('hex');
	for(i=0;i<mainHashedWords.length; i++){
		if(mainHashedWords[i].includes(hash)){
			return mainHashedWords[i].indexOf(hash);
		}
	}
}


*/