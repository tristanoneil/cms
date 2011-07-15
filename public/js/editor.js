$(document).ready(function(){
  var Editor = CodeMirror(document.body, {
    value: $('#content').val(),
    mode: {name: "javascript", json: true},
    tabMode: "indent",
    matchBrackets: true,
    theme: "editor",
    lineNumbers: true
  });

  $('.reference').click(function(){
    $('.CodeMirror-scroll').css('width', '65%');
    $('#reference').toggle('slide');
  });

  $('.save').click(function(){
    $.post('/page', { content: Editor.getValue() }, function(data) {
      $('#notifications').html(data).fadeIn('slow').delay(2500).fadeOut('slow');
    });
  });
});
