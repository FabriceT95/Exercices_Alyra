const crypto = require('crypto');

function genererCle(message){
	return crypto.randomBytes(message.length)
	
}

function chiffrerMessage(message,cle){
	let bufferMsg = Buffer.from(message);
    let messageChiffre=[];
    let messageChiffreString = ''
    for(let i= 0; i<message.length; i++){
    	messageChiffreString += (bufferMsg[i] ^ cle[i]).toString(16);
        messageChiffre.push(bufferMsg[i] ^ cle[i])
    }
    console.log("version chaine :", messageChiffreString)
 	return messageChiffre;

}


function decrypterMessage(messageChiffre, cle){
    let messageDeBase = [];
    for (let i = 0; i < messageChiffre.length; i++) {
        messageDeBase.push(messageChiffre[i] ^ cle[i]); 
	}
	return Buffer.from(messageDeBase)
}


// Message
let message = "Bonjour!"
console.log("message",message,"\t",Buffer.from(message))

// Clé
let cle = genererCle(message)
console.log("cle\t\t",cle)

// Chiffrement
let messageChiffre = chiffrerMessage(message,cle)
console.log("Chiffré, tableau", messageChiffre)
console.log("Chiffré, Buffer ", Buffer.from(messageChiffre))


console.log("Dechiffre, Buffer", decrypterMessage(messageChiffre,cle));
