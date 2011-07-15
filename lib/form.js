var schema = require('./schema.js'),
    inflection = require('./inflection.js');

exports.generateForm = function(context, values, id){
  var file = JSON.parse(schema.open(inflection.singularize(context)));
  var action = id ? '/' + context + '/' + id : '/' + context;

  var form = '<form name="' + context + '" action="' + action + '" method="POST">';

  for(field in file) {
    var value = values && values[field] ? values[field] : '';
    form += generateField(field, file[field].widget, file[field].required, file[field].options, value);
  }

  form += '<input type="hidden" name="content" value="' + inflection.singularize(context) + '">';
  form += '<input type="submit"></form>';
  return form;
}

function generateField(field, widget, required, options, value){
  var html = required ? '<div class="field required">' : '<div class="field">';

  html += '<label for="' + field + '">' + inflection.capitalize(field) + '</label><br/>';

  switch(widget)
  {
    case "TextField":
      html += '<input type="text" name="' + field + '" value="' + value + '">';
      break;

    case "TextArea":
      html += '<textarea name="' + field + '" rows="20" cols="30">' + value + '</textarea>';
      break;

    case "Boolean":
      if(value) {
        html += '<input type="checkbox" name="' + field + '" checked="yes">';
      }
      else {
        html += '<input type="checkbox" name="' + field + '">';
      }
      break;

    case "RadioButtons":
      for(option in options) {
        html += inflection.capitalize(options[option]);
        if(isSelected(value, options[option])) {
          html += '<input type="radio" name="' + field + '" value="' + options[option] + '" checked="yes">';
        }
        else {
          html += '<input type="radio" name="' + field + '" value="' + options[option] + '">';
        }
      }
      break;

    case "Checkboxes":
      for(option in options) {
        html += inflection.capitalize(options[option]);
        if(isSelected(value, options[option])) {
          html += '<input type="checkbox" name="' + field + '" value="' + options[option] + '" checked="yes">';
        }
        else {
          html += '<input type="checkbox" name="' + field + '" value="' + options[option] + '">';
        }
      }
      break;

    case "Dropdown":
      html += '<select name="' + field + '">';
      for(option in options) {
        if(isSelected(value, options[option])) {
          html += '<option value="' + options[option] + '" selected="true">' + options[option] + '</option>';
        }
        else {
          html += '<option value="' + options[option] + '">' + options[option] + '</option>';
        }
      }
      html += '</select>'
      break;
  }

  html += '</div>';
  return html;
}

function isSelected(value, option){
  if(value instanceof Array) {
    for(v in value) {
      if(value[v] == option) {
        return true;
      }
    }
  }
  else if(value == option) {
    return true;
  }
  return false;
}
