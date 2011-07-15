$(document).ready(function(){
  var myCodeMirror = CodeMirror(document.body, {
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
});
