
const randomNumber = Math.round(Math.random() * 100 + 1);
let goodAnswer = true;
while(goodAnswer){
	var choice = prompt("Choisissez un nombre entre 1 et 100");
	choice = parseInt(choice,10);
	if(parseInt(choice,10)){
		let diff = choice - randomNumber;
		if(-5 <= diff && diff < 0){
			console.log(choice)
			console.log("C'est un tout petit peu plus");

		}
		else if(0 < diff && diff <= 5){
			console.log(choice)
			console.log("C'est un tout petit peu moins");
		}
		else if(diff < -5){
			console.log(choice)
			console.log("C'est beaucoup plus");
		}
		else if(diff > 5){
			console.log(choice)
			console.log("C'est beaucoup moins");
		}else{
			console.log("Exact !");
			goodAnswer = false;

		}
	}else{
		alert("Saisissez un nombre ! Ce n'est pas à un nombre !");
	}
}