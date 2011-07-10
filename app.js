var express = require('express'),
    model = require('./lib/model.js'),
    form = require('./lib/form.js');

var app = express.createServer(
  express.bodyParser(),
  express.cookieParser(),
  express.static(__dirname + '/public')
);

app.set('view engine', 'jade');

app.get('/', function(req, res){
  res.render('index');
});

app.get('/:content', function(req, res){
  model.getAll(req.params.content, function(error, data){
    res.render(req.params.content + '/index', { data: data });
  });
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
