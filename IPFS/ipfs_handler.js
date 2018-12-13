const ipfsAPI = require('ipfs-api');
const express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
const fs = require('fs');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Connceting to the ipfs network via infura gateway
const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'});

//Reading file from computer

//Creating buffer for ipfs function to add file to the system


//Addfile router for adding file a local file to the IPFS network without any local node
app.get('/addfile', function(req, res) {
    
let testFile = fs.readFileSync(req.query.path);
let testBuffer = new Buffer(testFile);
    ipfs.files.add(testBuffer, function (err, file) {
        if (err) {
          console.log(err);
        }
        console.log(Object.keys(file));
        res.send(JSON.stringify(file));
      });
      

});
//Getting the uploaded file via hash code.
app.get('/getfile', function(req, res) {
    
    //This hash is returned hash of addFile router.
    const validCID = req.query.hash;

    ipfs.files.get(validCID, function (err, files) {
        files.forEach((file) => {
          console.log(file.path);
          console.log(file.content.toString('utf8'));
          let buffer = new Buffer(file.content);
          fs.writeFileSync("D:/ÉTS 2017-2018/Fall session 2018/INSE6630/Project/IPFS/downloaded_test_file.txt", buffer);
          res.send(file.path);
        });
      });

});

app.listen(3000, () => console.log('App listening on port 3000!'));
