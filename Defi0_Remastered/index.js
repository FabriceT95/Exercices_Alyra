console.log("Nous sommes dans le fichier principal");

var path = require('path')
const express = require('express');
const fetch = require('node-fetch')
const app = express()

const port = 8080


app.get('/', (req, resp)=>{
	resp.send("bojour");
})


app.get('/block/:block',(requete,reponse)=>{
    console.log(`vous avez demandé le block ${requete.params.block}`)
    //reponse.send(`vous avez demandé le block ${requete.params.block}`)
    const url = "https://blockchain.info/rawblock/"+requete.params.block
    fetch(url)
    .then(res => res.json())
    .then(function(json) {
	 	tabIdHash = []
	 	for(i=0; i < json.n_tx; i++){
	 		tabIdHash.push(json.tx[i].hash)
	 	}
	 	reponse.send("Vous avez demandé le block "+requete.params.block+".<br/>Ce block est daté du "+new Date(json.time)+".<br/>Sa hauteur est de "+ json.height+".<br/>Ses identifiants sont les suivants: <br/>"+ tabIdHash.join('<br/>'));
	 	
    })
    	
})

/*

app.get('/block/:block', (req, resp)=>{
	 console.log(`Vous avez demandé le block ${req.params.block}`)
	 const url = "https://blockchain.info/rawblock/"+req.params.block;
	 fetch(url)
 	.then(r => console.log(r.json()))
	 //.then(json=> {
	 	//resp.write("La date :", json.time);
	 	//resp.write("La hauteur :", json.height)
	 	/*tabIdHash = []
	 	for(i=0; i < json.n_tx; i++){
	 		tabIdHash.push(json.tx[i].hash)
	 	}

	 	resp.sendFile("La date: ", json.time , ". Sa hauteur: ", json.height, ". Ses id sont les suivants:", tabIdHash)*/

	 //	console.log("bonjour")
	// })

//})


app.listen(port, () => console.log(`le serveur est lancé sur http://localhost:${port} !`));