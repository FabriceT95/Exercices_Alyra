
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
	return ["0x"+stringHexaLittleEndian, "0x"+stringHexaBigEndian];

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

console.log("466321 : "+conversion(466321)) // 466321 : 0x911D07,0x071D91