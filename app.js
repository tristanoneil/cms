var express = require('express'),
    model = require('./lib/model.js'),
    editor = require('./lib/editor.js'),
    form = require('./lib/form.js');

var app = express.createServer(
  express.bodyParser(),
  express.cookieParser(),
  express.session({ secret: "keyboard cat" }),
  express.static(__dirname + '/public')
);

app.use(express.favicon());

app.set('view engine', 'jade');

app.get('/:context', function(req, res){
  model.getAll(req.params.context, function(error, data){
    var locals = {};
    locals[req.params.context] = data;
    res.render(req.params.context, locals);
  });
});

app.get('/:content/edit', function(req, res){
  var file = editor.open(req.params.content);
  res.render('admin/editor', { content: req.params.content, file: file, layout: false });
});

app.post('/:content', function(req, res){
  editor.save(req.params.context, req.body.content, function(error){
    if(error) {
      res.send(error);
    }
    else {
      res.send('Content saved.');
    }
  });
});

app.get('/:context/new', function(req, res){
  var html = form.generateForm(req.params.context, req.session.form);
  res.render('admin/new', { html: html, flash: req.flash('error'), layout: 'admin/layout' });
});

app.post('/:context', function(req, res){
  model.save(req.body, function(error, response){
    if(error) {
      req.session.form = req.body;
      req.flash('error', error.reason);
      res.redirect('/new/' + req.params.context);
    }
    else {
      res.redirect(req.params.context);
    }
  });
});

app.get('/:context/:id/edit', function(req, res){
    if(req.session.form) {
      var html = form.generateForm(req.params.context, req.session.form, req.params.id);
      res.render('admin/new', { html: html, flash: req.flash('error'), layout: 'admin/layout' });
    }
    else {
      model.get(req.params.id, function(error, data){
        if(error) {
          res.send(404);
        }
        else {
          var html = form.generateForm(req.params.context, data, data._id);
          res.render('admin/new', { html: html, flash: req.flash('error'), layout: 'admin/layout' });
        }
      });
    }
});

app.post('/:context/:id', function(req, res){
  model.update(req.params.id, req.body, function(error, response){
    if(error) {
      req.session.form = req.body;
      req.flash('error', error.reason);
      res.redirect(req.params.context + '/' + req.params.id + '/edit');
    }
    else {
      res.redirect(req.params.context + '/' + req.params.id);
    }
  });
});

app.get('/:context/:id', function(req, res){
  model.get(req.params.id, function(error, data){
    if(error) {
      res.send(404);
    }
    else {
      var locals = {};
      locals[data.content] = data;
      res.render(req.params.context + '/show', locals);
    }
  });
});

var port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log("App started on port " + port);
});
