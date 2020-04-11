var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u',
             'v', 'w', 'x', 'y', 'z','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
             'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z','1','2', '3', '4', '5','6', '7', '8', '9', '0']

function chiffreCesar(message, key){
	const messageLength = message.length;
	var cryptedMessageArray = [];
	var cryptedMessage = '';

	for(i = 0; i < messageLength;i++){
		var letter = message[i];
		var PositionInAlphabet = alphabet.indexOf(letter);
		cryptedMessage += alphabet[(PositionInAlphabet+key) % alphabet.length];
	}

	return cryptedMessage;
}

console.log(chiffreCesar('AbKoPJ0', 2))