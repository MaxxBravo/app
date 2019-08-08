// app.js
console.log('Iniciado');

var request = require('request');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine','html');
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/views', express.static(__dirname + '/views'));

var CONTACTS_INFO;

request.get({
    url: `https://s3.amazonaws.com/technical-challenge/v3/contacts.json`
}, (err, response, body) => {
    if (!err) {
        CONTACTS_INFO = JSON.parse(body)
        console.log(CONTACTS_INFO[0]);
    } else {
        
    }
});
app.get('/', (req, res) => {
    
    res.render('pages/contacts')
});

function getFilteredFavorites(flag){
    let filtered_contacts = CONTACTS_INFO.filter(contact => contact.isFavorite==flag);
    
    filtered_contacts.map((contact) => {
        console.log(contact.name);
        
    })
    return filtered_contacts;
}


app.get('/showFavorites', (req, res) => {
    res.send(getFilteredFavorites(true));
});

app.get('/showNotFavorites', (req, res) => {
    res.send(getFilteredFavorites(false));
});

app.put('/showFavorites', (req, res) => {
    res.send(getFilteredFavorites(true));
});

app.put('/showNotFavorites', (req, res) => {
    res.send(getFilteredFavorites(false));
});

const server = app.listen(5000, () => {
    const PORT = server.address().port;
    const ADDRESS = server.address().address || 'localhost';
    console.log(`App listening on URL: https://${ADDRESS}:${PORT}`);
    
})