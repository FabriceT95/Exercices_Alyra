const crypto = require("crypto");
const RIPEMD160 = require('ripemd160');
const bs58 = require('bs58');

function AdresseTypeBitcoin(){
	// Clé générée depuis la commande ssh-keygen
	var publicKey = "MIIEowIBAAKCAQEAzJIQSagPRMkySPpXhWn/7alSZLtqsxBneGiuJGkBWEfnz1390uTmKvvalQmgfxiU20ryGH2Goh1wP0sfF/mqX4Q7Li6j+5IZ8Bs0DFugAKqeH65o0ogiVZXpj27OF0QFD8tso9zMsBncozSmk33hUi1DqGgMRhPCDvm98hI4WUATV1kWtp/8/Nebt6dFT2kR8tUMhLcJe/yJ+UtO/jjzOlrm+czSs/XliLBuCmsYR6EMFCC/wtHScBvzO7QN/mkQHrol7BiFs1wEIyNmJimPG4n/czoZcJp85VvnvLhpMs1VTzfI"	

	// Premier hash sha256
	let hash256 = HachageHash256(publicKey);

	// Hachage du sha256 en hash160
	let hash160 = HachageRIPEMD160(hash256)

	// Ajout de l'identifiant "0x00" avec le hash160 dans le buffer
	// Hachage du hash160 avec son identifiant
	let hash256v2 = HachageHash256("0x00"+hash160)

	// Hachage du hachage précédent
	let hash256v3 = HachageHash256(hash256v2)

	// On encode le dernier hachage en base 58
	const bytes = Buffer.from(hash256v3, 'hex');
	const address = bs58.encode(bytes);
	console.log(address);

}

function HachageHash256(data){
	// Avant chaque hachage, on ajoute la valeur à hacher dans un buffer
	var dataBuffer = Buffer.from(data);
	return crypto.createHash('sha256').update(dataBuffer).digest('hex');
}

function HachageRIPEMD160(data){
	// Avant chaque hachage, on ajoute la valeur à hacher dans un buffer
	var dataBuffer = Buffer.from(data);
	// Hachage du sha256 en hash160
	return new RIPEMD160().update(dataBuffer).digest('hex');
}

AdresseTypeBitcoin();
