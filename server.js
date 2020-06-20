const express = require('express');
const app = express();
const DataStore = require('nedb');
const { response } = require('express');
const PORT = process.env.PORT || 5000;

app.listen(PORT, function() {
    console.log('listening on 5000');
});

const database = new DataStore('data.db');
database.loadDatabase();

app.use(express.static(__dirname + '/public'));
app.use(express.json({limit: '1mb'}));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/all', (req, res) => {
    database.find({}, (err, data) => {
        res.json(data);
    });
});

app.post('/insert', (req, res) => {
    console.log('Insertion request.');
    database.insert(req.body);
    console.log("Added", req.body);
});

app.post('/edit', (req, res) => {
    console.log('Edit request.');
    database.update(
        {name: req.body.name},
        { $set:
            {size: req.body.size, height: req.body.height, type: req.body.type}
        },
        {multi: true}
    );
    database.persistence.compactDatafile();
});

app.post('/remove', (req, res) => {
    console.log('Remove request.');
    database.remove(
        {name: req.body.name},
        {multi: true}
    );
    database.persistence.compactDatafile();
});