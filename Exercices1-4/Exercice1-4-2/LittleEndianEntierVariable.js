
const binToHex={"0000":"0","0001":"1","0010":"2","0011":"3","0100":"4","0101":"5","0110":"6","0111":"7","1000":"8","1001":"9","1010":"A","1011":"B","1100":"C","1101":"D","1110":"E","1111":"F"}
let DeciToBinaireArray = [];
function conversion(decimal){
	// Convertit le nombre décimal en binaire
	let binaire = DeciToBinaire(decimal);

	// Si ce nombre binaire n'est pas modulo 8, on lui rajoute des 0
	while(binaire.length % 8 != 0){
  		binaire.unshift(0)
	}

	const binaireLength = binaire.length

	// Effectue la conversion de binaire en hexa little endian
	let array1 = BinaireToHexaLittleEndian(binaireLength, binaire)
	// Effectue la conversion de binaire en hexa big endian
	let array2 = BinaireToHexaBigEndian(binaireLength,binaire);

	let stringHexaBigEndian = "";
	let stringHexaLittleEndian = "";

	// On ajoute chaque nombre hexa associé au nombre du dictionnaire binToHex, aux strings
	for (let i in array1){
		stringHexaBigEndian += binToHex[array2[i]];
		stringHexaLittleEndian += binToHex[array1[i]];
	}
	let stringHexaLittleEndianVarInt = stringHexaLittleEndian;
	return ["0x"+stringHexaLittleEndian, "0x"+stringHexaBigEndian, "0x"+checkVarInt(stringHexaLittleEndianVarInt, decimal)];

}


// Fonction de conversion du nombre décimal en binaire
function DeciToBinaire(decimal){
	// On divise le nombre par 2, on recupère 1 ou 0 à chaque division
	let reste = decimal % 2;
	DeciToBinaireArray.unshift(reste);

	// Si l'arrondi du quotien inférieur à 2, on arrête les divisions
	let quotient = Math.floor(decimal/2)
	if(quotient < 2){
		DeciToBinaireArray.unshift(1);
		return DeciToBinaireArray;
	}
	// Sinon on continue de diviser
	return DeciToBinaire(quotient);

}

// Fonction de conversion de binaire en hexa big endian
function BinaireToHexaBigEndian(i,binaire){
	// On prend une copie du tableau de binaires
	let binaireCopy = [...binaire]
	let binaireToHexaBigEndianArray = []

	// On regroupe les bits par 4
	while(i>0){
	    let a = binaireCopy.splice(i-4,i);
	  	binaireToHexaBigEndianArray.unshift(a.join(',').replace(/,/g, ""));      
	    i = i-4;

	}
	return binaireToHexaBigEndianArray

}

// Fonction de conversion de binaire en hexa little endian
function BinaireToHexaLittleEndian(i,binaire){
	// On prend une copie du tableau de binaires
	let binaireCopy = [...binaire]
	let binaireToHexaLittleEndianArray  = []

	// On regroupe les bits par 8, on divise ensuite chacun de ces paquets, on push octet par octet à chaque itération
	while(i>0){
	    let a = binaireCopy.splice(i-8,i);
	    let firstHalfByte = a.slice(0,a.length/2);
	    let secondHalfByte = a.slice(a.length/2);
	  	binaireToHexaLittleEndianArray.push(firstHalfByte.join(',').replace(/,/g, ""));   
	  	binaireToHexaLittleEndianArray.push(secondHalfByte.join(',').replace(/,/g, ""))
	    i = i-8;
	}
	return binaireToHexaLittleEndianArray
}

// Fonction de conversion en entier variable
function checkVarInt(stringHexaLittleEndianVarInt, decimal){
	// Si le nombre décimal est inférieur ou égal à 253, on n'indique pas sa taille, il n'aura aucun octet supplémentaire 
	if(decimal > 253){
		stringHexaLittleEndianVarIntLength = stringHexaLittleEndianVarInt.length;

		// Si le nombre d'octet est inférieur ou égal à 2, on ajoute en premier octet "0xfd"
		if(stringHexaLittleEndianVarIntLength < 4 || stringHexaLittleEndianVarIntLength == 4 ){
			// Si la représentation hexadécimal n'est pas constituée de 2 octets, on lui rajoute autant de "0" devant que nécessaire
			while(stringHexaLittleEndianVarIntLength < 4){
				stringHexaLittleEndianVarInt += "0";
				stringHexaLittleEndianVarIntLength++;
			}
			return "fd"+stringHexaLittleEndianVarInt;
		}
		// Si le nombre d'octet est compris entre 4 et 8 inclus, on ajoute en premier octet "0xfe"
		else if((stringHexaLittleEndianVarIntLength > 4 && stringHexaLittleEndianVarIntLength < 8) || stringHexaLittleEndianVarIntLength == 8 ){
						// Si la représentation hexadécimal n'est pas constituée de 4 octets, on lui rajoute autant de "0" devant que nécessaire
			while(stringHexaLittleEndianVarIntLength < 8){
				stringHexaLittleEndianVarInt += "0";
				stringHexaLittleEndianVarIntLength++;
			}
			return "fe"+stringHexaLittleEndianVarInt;
		}	
		// Si le nombre d'octet est compris entre 8 et 16 inclus, on ajoute en premier octet "0xff"
		else if((stringHexaLittleEndianVarIntLength > 8 && stringHexaLittleEndianVarIntLength < 16) || stringHexaLittleEndianVarIntLength == 16){
						// Si la représentation hexadécimal n'est pas constituée de 8 octets, on lui rajoute autant de "0" devant que nécessaire
			while(stringHexaLittleEndianVarIntLength < 16){
				stringHexaLittleEndianVarInt += "0";
				stringHexaLittleEndianVarIntLength++;
			}
			return "ff"+stringHexaLittleEndianVarInt;
		}		
	}
}

console.log("466321 : "+conversion(466321)) // 466321 : 0x911D07,0x071D91,0xfe911D0700