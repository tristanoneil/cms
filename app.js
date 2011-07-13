var express = require('express'),
    model = require('./lib/model.js'),
    helper = require('./lib/helper.js'),
    form = require('./lib/form.js');

var app = express.createServer(
  express.bodyParser(),
  express.cookieParser(),
  express.session({ secret: "keyboard cat" }),
  express.static(__dirname + '/public')
);

app.use(express.favicon());

app.set('view engine', 'jade');

app.get('/', function(req, res){
  res.render('index');
});

app.get('/:context', function(req, res){
  model.getAll(req.params.context, function(error, data){
    var locals = {};
    locals[req.params.context] = data;
    res.render(req.params.context, locals);
  });
});

app.get('/new/:context', function(req, res){
  var html = form.generateForm(req.params.context, req.session.form);
  res.render('admin/new', { html: html, flash: req.flash('error'), layout: 'admin/layout' });
});

app.post('/create/:context', function(req, res){
  model.save(req.body, function(error, response){
    if(error) {
      req.session.form = req.body;
      req.flash('error', error.reason);
      res.redirect('/new/' + req.params.context);
    }
    else {
      res.redirect(helper.pluralize(req.params.context));
    }
  });
});

app.get('/:context/:id', function(req, res){
  model.get(req.params.id, function(error, data){
    var locals = {};
    locals[req.params.context] = data;
    res.render(helper.pluralize(req.params.context) + '/show', locals);
  });
});

var port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log("App started on port " + port);
});
