const express = require('express');
const multer = require('multer');
const upload = multer({dest: __dirname + '/uploads'});

const app = express();
const PORT = 3000;

app.use(express.static('client'));

app.get('/', function(req, res) {
    res.sendFile( __dirname + '/client/img.html');
});

app.post('/upload', upload.single('photo'), (req, res) => {
    if(req.file) {
        //res.json(req.file);
    }
    else throw 'error';
});

app.listen(PORT, () => {
    console.log('Listening at ' + PORT );
});