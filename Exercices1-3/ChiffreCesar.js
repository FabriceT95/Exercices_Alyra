function chiffreCesar(message, key){
	const alphabet = Array.apply(undefined, Array(26)).map(function(x,y) { return String.fromCharCode(y + 65).toLowerCase(); })
	const messageToArray = message.split('');
	let cryptedMessageArray = [];
	let cryptedMessage = '';

	for(i = 0; i <= messageToArray.length;i++){
		var letter = messageToArray[i];
		cryptedMessage[i].push(alphabet[])
	}
}