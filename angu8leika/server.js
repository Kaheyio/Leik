const express = require('express');

const path = require('path');

const app = express();

// TODO: change path ?
app.use(express.static(__dirname + '/dist/angu8leika'));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/angu8leika/index.html'));
});

app.listen(process.env.PORT);