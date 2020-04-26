const express = require('express');
const http = require('https');
const Client = require('bitcoin-core');
const server = express();

// Setup EJS
server.set("view engine", "ejs");

// Using css and js files from static folders
server.use(express.static(__dirname + '/css'));
server.use(express.static(__dirname + '/js'));
server.use(express.static(__dirname + '/img'));

server.get('/', function (request, response) {
    response.render('pages/index');
});

server.get('/secPage', function (request, response) {
    response.render('pages/displayFromBloc');
});

server.get('/rawblock/:block', function (request, response) {
    response.setHeader('Content-Type', 'application/json');
    const url = 'https://blockchain.info/rawblock/' + request.params.block;
    http.get(url, (res) => {
        if (res.statusCode != 200) {
            console.log("non-200 response status code:", res.statusCode);
            console.log("for url:", url);
            if (res.statusCode == 500) {
                response.end(JSON.stringify({error: res.statusCode}));
            }
        }

        let rawData = '';
        res.on('data', (chunk) => {
            rawData += chunk;
        });
        res.on('end', () => {
            try {
                let parsedData = JSON.parse(rawData);
                parsedData = JSON.stringify(parsedData)
                response.end(parsedData);
            } catch (e) {
                console.log(e.message);
            }
        });

        //response.send("bonjour");

        /*   fetch("https://blockchain.info/rawblock/"+request.params.block)
           .then(response=>response.json())
           .then(data=>{console.log(data); response.send(data)})*/
    });
});

server.listen(8080);

/*
server.get('/bonjour', function(request, reponse){
	const client = new Client({
		network: 'regtest',
		username: 'user',
		password: 'pass',
		port: 8080
	});

	client.getInfo().then((help) => console.log(help));
});

 */
