const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const express = require('express');
const cors = require('cors');

const app = express();

const fetch = require('node-fetch');

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.post('/', async (req, res) => {
    const url = req.body.domain + req.body.endpoint;
    const options = {
		'method': req.body.getorput,
		'headers': {
            'Content-Type': 'application/json',
		    'authorization': 'Bearer ' + req.body.security_code,
		    'accept': 'application/json'
        },
        'body': req.body.data,
		'timeout': 5000
	};
    fetch(url, options).then(response=>response.json())
    .then(response=>{return res.send(response);})
    .catch(err=>{return res.send(err)});
});


exports.helloWorld = functions.https.onRequest(app);

