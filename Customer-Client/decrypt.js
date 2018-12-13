const express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
const fs = require('fs');
const app = express();
const EthCrypto = require('eth-crypto');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/decrypt', function (req,res){
    let encrypt = fs.readFileSync(req.query.path);
let buffer = new Buffer(File);
let privatekey = req.query.privatekey;
const File = EthCrypto.decryptWithPrivateKey(
    privatekey, 
    encrypt);
    res.send(File);
});

app.listen(3002, () => console.log('App listening on port 3002!'));
