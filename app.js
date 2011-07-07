var express = require('express'),
    cradle = require('cradle'),
    form = require('./form.js');

var db = new(cradle.Connection)('http://tristanoneil.iriscouch.com').database('cms');

var app = express.createServer(
  express.bodyParser(),
  express.cookieParser(),
  express.static(__dirname + '/public')
);

app.get('/', function(req, res){

});

app.get('/new/:content', function(req, res){
  var c = form.generateForm(req.params.content);
  res.send(c);
});

app.post('/create/:content', function(req, res){
  db.save(req.body, function(err, res){
    if(err){
      // Store error in session
    }
  });
  res.redirect('/new/' + req.params.content);
});

app.listen(3000);
console.log('App started at http://localhost:3000');
