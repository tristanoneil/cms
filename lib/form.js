fs = require('fs');

exports.generateForm = function(context){
  var file = fs.readFileSync('content/' + context + '.json', 'utf8');
  var schema = JSON.parse(file);

  var form = '<form name="' + context + '" action="/create/' + context + '" method="POST">';


  for(field in schema) {
    form += generateField(field, schema[field].widget, schema[field].required, schema[field].options);
  }

  form += '<input type="hidden" name="content" value="' + context + '">';
  form += '<input type="submit"></form>';
  return form;
}

function generateField(field, widget, required, options){
  var html = required ? '<div class="field required">' : '<div class="field">';

  html += '<label for="' + field + '">' + capitalizeLabel(field) + '</label><br/>';

  switch(widget)
  {
    case "TextField":
      html += '<input type="text" name="' + field + '">';
      break;

    case "TextArea":
      html += '<textarea name="' + field + '" rows="20" cols="30"></textarea>';
      break;

    case "Boolean":
      html += '<input type="checkbox" name="' + field + '">';
      break;

    case "RadioButton":
      for(option in options) {
        html += capitalizeLabel(options[option]);
        html += '<input type="radio" name="' + field + '" value="' + options[option] + '">';
      }
      break;

    case "Checkbox":
      for(option in options) {
        html += capitalizeLabel(options[option]);
        html += '<input type="checkbox" name="' + field + '" value="' + options[option] + '">';
      }
      break;

    case "Dropdown":
      html += '<select name="' + field + '">';
      for(option in options) {
        html += '<option value="' + options[option] + '">' + capitalizeLabel(options[option]) + '</option>';
      }
      html += '</select>'
      break;
  }

  html += '</div>';
  return html;
}

function capitalizeLabel(label)
{
  return label.charAt(0).toUpperCase() + label.slice(1);
}
