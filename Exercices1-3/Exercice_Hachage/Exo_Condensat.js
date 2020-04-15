/*function pseudoHash(string){

	let hash = 0;
	for(i=0; i<string.length;i++){
		hash += (hash+13)*string.charCodeAt(i) ** i
	}

	return hash % (256*256)
}

console.log(pseudoHash('bonjour'));
console.log(pseudoHash('bonjour.'));
console.log(pseudoHash('Bonjoru'));
console.log(pseudoHash('Bonjour'));
*/


const crypto = require('crypto');
function codeVerification(message){
	let data = Buffer.from(message)
	let hash = crypto.createHash('sha256').update(data).digest('hex')
	
	let fourthNumber = hash.substring(0, 4)
	return fourthNumber
}



function verifierCode(message, code){
	if(codeVerification(message) == code){
		return true
	}else{
		return false
	}
}

function vanite(debut, message){
    let nonce = 0
    // On fait un hashage du message avec le nonce
    // Tant que le message ne commence pas par le contenu de "debut", on incrémente la variable "nonce"
    while(true){
	    nonce+=1
	    let data = Buffer.from(message+nonce)
	    let hash = crypto.createHash('sha256').update(data).digest('hex').startsWith(debut)
		if(hash){
			return nonce
		}
	}
}

let message = "Bonjour à tous"
let data = Buffer.from(message)
let hash = crypto.createHash('sha256').update(data)

let debutHash = 'ab'
console.log(`Un hash débutant par \'${debutHash}\' peut être obtenu en ajoutant ${vanite(debutHash,message)} au message`)