const alphabetMinuscule = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u',
             'v', 'w', 'x', 'y', 'z'];

function Vigenere(keyword, message){
	// Si notre message est une phrase, on supprime les espaces
	const messageNoSpace = message.replace(/\s+/g, '');
	console.log("Message no space :"+messageNoSpace);

	// Longueur de notre clé de cryptage
	const keywordLength = keyword.length;
	console.log("Keyword Length : "+keywordLength);

	// Longueur de notre message sans espace
	const messageLength = messageNoSpace.length;
	console.log("Message no space length :"+messageLength);

	// String vide pour recueillir des morceaux du message crypté en bloque de la taille du keyword
	let cryptedchunk = "";

	let cryptedMessageArray = [];

	// On loop sur le message 
	for(i = 0; i<messageLength; i++){
		let cryptedchunk = "";
		// On loop sur le keyword
		for (j = 0; j<keywordLength; j++){
			// Calcul du décalage à partir de l'index de la lettre j du keyword par rapport à sa position dans l'alphabet
			let decalage = alphabetMinuscule.indexOf(keyword[j]);

			// Calcul du décalage à partir de l'index de la lettre i+j du message par rapport à sa position dans l'alphabet
			let positionMessageNoSpace = alphabetMinuscule.indexOf(messageNoSpace[i+j]);

			// On récupère l'index de la lettre à crypter, et on n'oublie pas d'utiliser le modulo pour revenir au début de l'alphabet
			let cryptedPositionLetter = (decalage + positionMessageNoSpace) % alphabetMinuscule.length;

			// On recupère la lettre associée à l'index de l'alphabet
			let cryptedLetter = alphabetMinuscule[cryptedPositionLetter];

			// On ajoute la lettre à un chunk qui, à chaque fois que le keyword fera sa chaine complète, s'ajoutera au tableau cryptedMessageArray
			cryptedchunk+= cryptedLetter;
		}
		// Comme nous avançons de 3 itérations dans le message avec le keyword, nous devons également avancer de 3 dans le message, donc pas i+1 mais i+3
		i = i + (keywordLength-1)
		console.log("Crypted Chunk : " +cryptedchunk);
		cryptedMessageArray.push(cryptedchunk);
	}

  cryptedMessageArray = cryptedMessageArray.join('');
  if(messageLength < cryptedMessageArray.length){
    let diff = messageLength - cryptedMessageArray.length;
    cryptedMessageArray = cryptedMessageArray.slice(0, diff);
  }
	console.log("Crypted message : "+cryptedMessageArray);
	return cryptedMessageArray;
}

Vigenere('fvenjvenvl', 'bonjour je suis un lama')