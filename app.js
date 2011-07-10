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
  model.save(req.body, function(error, data){
    if(error) {
      // Save error in session
    }
  });
  res.redirect('/new/' + req.params.content);
});

var port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log("App started on port " + port);
});
