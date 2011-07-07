fs = require('fs');

exports.generateForm = function(content){
  var file = fs.readFileSync('content/' + content + '.json', 'utf8');
  var schema = JSON.parse(file);

  var form = '<form name="' + content + '" action="/create/' + content + '" method="POST">';

  for(field in schema) {
    form += generateField(field, schema[field]);
  }

  form += '<input type="submit"></form>';
  return form;
}

function generateField(field, type){
  var html = '<div class="field">';
  html += '<label for="' + field + '">' + capitalizeLabel(field) + '</label><br/>';

  switch(type)
  {
    case "TextField":
      html += '<input type="text" name="' + field + '">';
      break;

    case "TextArea":
      html += '<textarea name="' + field + '" rows="20" cols="30"></textarea>';
      break;

    case "Boolean":
      html += '<input type="checkbox" name="' + field + '">';
  }

  html += '</div>';
  return html;
}

function capitalizeLabel(label)
{
  return label.charAt(0).toUpperCase() + label.slice(1);
}
