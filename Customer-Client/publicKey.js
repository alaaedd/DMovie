/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    port = process.env["PORT"] || 8181;
var path = require("path");
var EC = require ('elliptic').ec;
var ec = new EC('secp256k1');


 
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
 
app.get("/publicKey", function(req, res) {
    // if you chose to send data as a query in the URL
    var key = ec.keyFromPrivate(req.query.q, 'hex');
    var pubpoint = key.getPublic();
    var pubkey = pubpoint.encode('hex');
    console.log(req.query.q);
    // if you chose to send data as JSON
    console.log(req.body.q);
     // finally, respond to the client
    res.send(pubkey);
});
 
app.listen(port);
console.log("listening to server on port:", port);



