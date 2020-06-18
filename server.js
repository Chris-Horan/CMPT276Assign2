const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 5000));

app.listen('port', function() {
    console.log('listening on 5000');
});

app.get('/', function(req, res) {
    res.send("test");
});