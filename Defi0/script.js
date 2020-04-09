// Fonction de création de la requête 	
let ajax = function (url) {
  return new Promise(function (resolve, reject) {
    let req = new XMLHttpRequest()
    req.open('GET', url, true)
    req.onreadystatechange = function (aEvt) {
      if (req.readyState == 4) {
         if(req.status == 200)
           resolve(req.responseText)
         else
           reject(req)
      }
    };
    req.send(null)
  })
}

// Conversion du décimal vers l'hexadecimal
let deciToHexa = function(decimal){
	var stringToInt = parseInt(decimal);
	if(!Number.isNaN(stringToInt)){
		result_span.innerText = stringToInt.toString(16);
		ajax('http://numbersapi.com/' + stringToInt)
			.then(function (response) {
  				anecdote.innerText = response;
			}).catch(function (req) {
  				console.log(req.responseText);
			})
	}else{
		result_span.innerText = "Cette valeur n'est pas un entier";
	}
}

// Conversion de l'hexadecimal vers le décimal
let hexaToDeci = function(hexa){
	var IntToHexa = parseInt(hexa,16);
	if(!Number.isNaN(IntToHexa)){
		result_span.innerText = IntToHexa;
		ajax('http://numbersapi.com/' + IntToHexa)
			.then(function (response) {
  			anecdote.innerText = response;
			}).catch(function (req) {
  			console.log(req.responseText);
		})
	}else{
		result_span.innerText = "Cette valeur n'est pas un hexadecimal";
	}

}

// Mise en const des éléments du DOM
const decimal_conversion = document.getElementById("decimal_conversion");
const hexa_conversion = document.getElementById("hexa_conversion");
const result_span = document.getElementById("result");
const inputs = document.getElementsByTagName('input');
const anecdote = document.getElementById("anecdote");


// Ajout d'event pour les conversions 
decimal_conversion.addEventListener('click', function(){ hexaToDeci(inputs[0].value) });
hexa_conversion.addEventListener('click', function() { deciToHexa(inputs[0].value )});
