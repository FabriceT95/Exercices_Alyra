const binToHex = {
    "0000": "0",
    "0001": "1",
    "0010": "2",
    "0011": "3",
    "0100": "4",
    "0101": "5",
    "0110": "6",
    "0111": "7",
    "1000": "8",
    "1001": "9",
    "1010": "A",
    "1011": "B",
    "1100": "C",
    "1101": "D",
    "1110": "E",
    "1111": "F"
}
const hexToBin = {
    "0": "0000",
    "1": "0001",
    "2": "0010",
    "3": "0011",
    "4": "0100",
    "5": "0101",
    "6": "0110",
    "7": "0111",
    "8": "1000",
    "9": "1001",
    "A": "1010",
    "B": "1011",
    "C": "1100",
    "D": "1101",
    "E": "1110",
    "F": "1111"
}


// Hexa en décimal 
let hexaToDecimal = function (hex) {
    hexaToDecimalResult.innerText = parseInt(hex, 16);
}


// Décimal en Hexa
let deciToHexadecimal = (d) => {
    let hexa = parseInt(d, 10).toString(16);
    if (hexa.length % 2 == 1) {
        hexa = '0' + hexa
    }
    deciToHexadecimalResult.innerText = "0x" + hexa.toUpperCase();
}


// Hexa Little Endian en Hexa
let hexaLEToHexa = (hexaLE) => {

    hexaLE = hexaLE.replace(/\s+/g, '').toUpperCase();
    if (hexaLE.startsWith("0X")) {
        hexaLE = hexaLE.slice(2, hexaLE.length);
    }

    let convertToBinaire = [];
    for (let i = 0; i < hexaLE.length; i++) {
        convertToBinaire.push(hexToBin[hexaLE[i]])
    }

    let octetsArray = [];
    let j = 0;
    while (j < convertToBinaire.length) {
        octetsArray.unshift(convertToBinaire[j + 1]);
        octetsArray.unshift(convertToBinaire[j]);
        j += 2;
    }

    let hexaString = "";
    for (i = 0; i < octetsArray.length; i++) {
        hexaString += binToHex[octetsArray[i]];
    }

    if (hexaString.startsWith("0")) {
        hexaString = hexaString.slice(1);
    }

    hexaLEToHexaResult.innerText = hexaString;
}


// varInt en decimal


// Champ Bits en Cible correspondante
let calculerCible = (bits) => {
    const diff = parseInt(bits, 16) / ((2 ** 16 - 1) * 2 ** 208);
    return ((2 ** 16 - 1) * 2 ** 208 / diff);
    //calculerCibleResult.innerText = ((2**16 - 1) * 2**208 / diff).toString();
};

let displayCible = (bits) => {
    calculerCibleResult.innerText = (calculerCible(bits)).toString();
};


// Cible en Difficulté
let calculerDifficulte = (cible) => {
    return ((2 ** 16 - 1) * 2 ** 208 / cible);
};

let displayDifficulte = (cible) => {
    calculerDifficulteResult.innerText = (calculerDifficulte(cible)).toString();
};


// Decimal en binaire
let DeciToBinaire = (d, firstTime) => {
    if (firstTime) {
        let DeciToBinaireArray = [];
    }
    // On divise le nombre par 2, on recupère 1 ou 0 à chaque division
    let reste = decimal % 2;
    DeciToBinaireArray.unshift(reste);

    // Si l'arrondi du quotien inférieur à 2, on arrête les divisions
    let quotient = Math.floor(decimal / 2);
    if (quotient < 2) {
        DeciToBinaireArray.unshift(1);
        return DeciToBinaireArray;
    }
    // Sinon on continue de diviser
    return DeciToBinaire(quotient, false);

}

// Get rawblock from hash
let getRawblockFromHash = (hash) => {
    try {
        $.get("/rawblock/" + hash, function (data) {
            if (!data.error) {
                document.getElementById('champBits').innerText = (data.bits).toString();
                document.getElementById('cible').innerText = (calculerCible(data.bits)).toString();
                document.getElementById('difficulte').innerText = (calculerDifficulte(data.bits)).toString();
                document.getElementById('charge').innerText = (data.fee).toString();
                document.getElementById('hashbloc').innerText = (data.hash).toString();
                document.getElementById('n_tx').innerText = (data.n_tx).toString();
                document.getElementById('nonce').innerText = (data.nonce).toString();
                document.getElementById('prev_block').innerText = (data.prev_block).toString();
                document.getElementById('size').innerText = (data.size).toString();
                const d = new Date(data.time * 1000);
                document.getElementById('date').innerText = (d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear() + ' - ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()).toString();
                const tableTransactions = document.getElementById('tableContent');
                tableTransactions.innerHTML = '';
                let i = 1;
                data.tx.forEach(transaction => {
                    let dateTransaction = new Date(transaction.time * 1000);
                    let formatDate = (dateTransaction.getDate() + '/' + dateTransaction.getMonth() + '/' + dateTransaction.getFullYear() + ' - ' + dateTransaction.getHours() + ':' + dateTransaction.getMinutes() + ':' + dateTransaction.getSeconds()).toString();
                    tableTransactions.innerHTML += ('<tr><th scope="row">' + i + '</th><td>' + transaction.hash + '</td><td>' + transaction.size + '</td><td>' + formatDate + '</td></tr>');
                    i += 1
                });

            } else if (data.error == 500) {
                const modalFadeError = document.getElementById('modalFadeError');
                modalFadeError.children[0].innerText = "Erreur : " + (data.error).toString();
                modalFadeError.classList.remove('hidden');
                modalFadeError.classList.add('show');
                setTimeout(function () {
                        modalFadeError.classList.remove('show');
                        modalFadeError.classList.add('hidden');
                    },
                    3000);
            }
        })

        /*
            fetch("/"+hash)
            .then(res => console.log(res))
        */
        /*    .then(res => res.json())
            .then(function(json) {
                 console.log(json)
            }).catch(function (req) {
                  console.log(req.responseText);
            })*/
    } catch (e) {
        console.log("Error in getting the rawblock : " + e);
    }
}


if (document.getElementById("hexaToDecimalButton")) {

    /////////////////// hexaToDecimal setup
    const hexaToDecimalButton = document.getElementById("hexaToDecimalButton");
    const hexaToDecimalResult = document.getElementById("hexaToDecimalResult");
    const hexaToDecimalInput = document.getElementById('hexaToDecimalInput');

    hexaToDecimalButton.addEventListener('click', function () {
        hexaToDecimal(hexaToDecimalInput.value)
    });
    //////////////////


    /////////////////// deciToHexadecimal setup
    const deciToHexadecimalButton = document.getElementById("deciToHexadecimalButton");
    const deciToHexadecimalResult = document.getElementById("deciToHexadecimalResult");
    const deciToHexadecimalInput = document.getElementById('deciToHexadecimalInput');

    deciToHexadecimalButton.addEventListener('click', function () {
        deciToHexadecimal(deciToHexadecimalInput.value)
    });
    //////////////////


    /////////////////// hexaLEToHexa setup
    const hexaLEToHexaButton = document.getElementById("hexaLEToHexaButton");
    const hexaLEToHexaResult = document.getElementById("hexaLEToHexaResult");
    const hexaLEToHexaInput = document.getElementById('hexaLEToHexaInput');

    hexaLEToHexaButton.addEventListener('click', function () {
        hexaLEToHexa(hexaLEToHexaInput.value)
    });
    //////////////////


    /////////////////// calculerCible setup
    const calculerCibleButton = document.getElementById("calculerCibleButton");
    const calculerCibleResult = document.getElementById("calculerCibleResult");
    const calculerCibleInput = document.getElementById('calculerCibleInput');

    calculerCibleButton.addEventListener('click', function () {
        displayCible(calculerCibleInput.value)
    });
    //////////////////


    /////////////////// calculerCible setup
    const calculerDifficulteButton = document.getElementById("calculerDifficulteButton");
    const calculerDifficulteResult = document.getElementById("calculerDifficulteResult");
    const calculerDifficulteInput = document.getElementById('calculerDifficulteInput');

    calculerDifficulteButton.addEventListener('click', function () {
        displayDifficulte(calculerDifficulteInput.value)
    });
    //////////////////
} else {

    /////////////////// hexaToDecimal setup
    const getRawblockFromHashButton = document.getElementById("getRawblockFromHashButton");
    const getRawblockFromHashResult = document.getElementById("getRawblockFromHashResult");
    const getRawblockFromHashInput = document.getElementById('getRawblockFromHashInput');

    getRawblockFromHashButton.addEventListener('click', function () {
        getRawblockFromHash(getRawblockFromHashInput.value)
    });
    //////////////////
}
