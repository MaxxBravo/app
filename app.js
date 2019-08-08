// app.js

var request = require('request');
var express = require('express');

console.log('Iniciado');


request.get({
    headers: {'content-type': 'application/json'},
    url: `https://s3.amazonaws.com/technical-challenge/v3/contacts.json`
}, (err, response, body) => {
    if (!err) {
        // console.log();
        console.log(JSON.parse(body));
        // console.log(body);
        // console.log('algo');
        
    } else {
        
    }
});