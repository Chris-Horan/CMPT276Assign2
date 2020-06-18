const express = require('express');
const app = express();

//app.set('port', (process.env.PORT || 5000));
const PORT = process.env.PORT || 5000;

app.listen(PORT, function() {
    console.log('listening on 5000');
});

app.get('/', function(req, res) {
    res.send("test");
});