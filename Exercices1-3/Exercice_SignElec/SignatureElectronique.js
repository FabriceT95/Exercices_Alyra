const crypto = require('crypto');

// Génère une clé privée et une clé publique
function generer(){
	const { privateKey, publicKey } = crypto.generateKeyPairSync('ec', {
	  namedCurve: 'sect239k1',
	  publicKeyEncoding:  { type: 'spki', format: 'pem' },
	  privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
	});

	return { privateKey, publicKey }

}

// Signe notre message avec la clé privée générée précédemment
function signer(message, clePriv){
	const sign = crypto.createSign('SHA256')
	sign.write(message)
	sign.end()
	return sign.sign(clePriv, 'hex')
}

// Vérifie que l'on peut décrypter le message avec la clé publique et la signature générée précédemment
function verifier(message, clePub, signature){
	const verify = crypto.createVerify('SHA256')
	verify.write(message)
	verify.end()
	return verify.verify(clePub, signature, 'hex')
}

const message = "Les chaussettes de l'archiduchesse sont-elles sèches archi-sèches?";
let { privateKey, publicKey } = generer();
let messageSigne = signer(message, privateKey);
console.log(verifier(message, publicKey, messageSigne))
