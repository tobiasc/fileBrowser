var express = require('express');
var cors = require('cors');
var app = express();
var fileService = require('./fileService');
var bodyParser = require('body-parser')
var port = 8080;

app.use(cors());
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.post('/folder', function (req, res) {
    var params = req.body;

    if (params && params.baseFolder) {
        fileService.readFolder(params.baseFolder, function (err, data) {
            if (err) {
                res.status(500).send('Something broke!');
            } else if (data) {
                if (params.maxEntries && parseInt(params.maxEntries)) {
                    data.splice(parseInt(params.maxEntries));
                }
                res.send(data);
            } else {
                res.status(500).send('Folder not found!');        
            }
        });
    } else {
        res.status(500).send('Missing params!');
    }
});

app.post('/file', function (req, res) {
    var params = req.body;

    if (params.baseFolder && params.file) {
        fileService.readFile(params.baseFolder, params.file, function (err, data) {
            if (err) {
                res.status(500).send('Something broke!');
            } else {
                res.send(data);
            }
        });
    } else {
        res.status(500).send('Missing params!');
    }
});

app.listen(port, function () {
    console.log('Example app listening on port ' + port);
});

