const express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
const fs = require('fs');
const app = express();
const EthCrypto = require('eth-crypto');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/encrypt', function (req,res){
    let File = fs.readFileSync(req.query.path);
let buffer = new Buffer(File);
let pubkey = req.query.pkey;
const encryptedFile = EthCrypto.encryptWithPublicKey(
    pubkey, 
    buffer);
    res.send(encryptedFile);
});

app.listen(3001, () => console.log('App listening on port 3001!'));
