UI.registerHelper('gridForm', function () {
  return Template._gridForm;
})

UI.registerHelper('gridSet', function () {
	 	if(!this.classes) this.classes = '';
  	this.classlist = 'grid-form-fieldset '+this.classes; 
		this.labelhtml = Spacebars.SafeString(this.label);
    return Template._gridFormFieldset;
});

UI.registerHelper('gridRow', function () {
	if(!this.span) this.span = 1;
 	if(!this.classes) this.classes = '';
  this.classlist = 'grid-form-row '+this.classes; 
	return Template._gridRow;
});

UI.registerHelper('gridElement', function(){
	if(!this.span) this.span = 1;
  if(!this.type) this.type = 'text';
 	if(!this.classes) this.classes = '';
	if(this.disabled) this.classes += ' grid-form-disabled no-hover';
  this.classlist = _.clean('grid-form-element '+this.classes); 
  if(this.type == 'text') {
	  return Template._gridElement;
  } else if(this.type == 'textarea') {
  	if(!this.rows) this.rows = 3;
	  return Template._gridElementTextArea;
  } else if(this.type == 'email') {
	  return Template._gridElementEmail;
  } else if(this.type == 'date') {
  	if(!this.format) this.format = 'yyyy-mm-dd';
		if(!this.step) this.step = 1;
	  return Template._gridElementDate;
  } else if(this.type == 'number') {
		if(!this.step) this.step = 1;
	  return Template._gridElementNumber;
  } else if(this.type == 'checkbox') {
	  return Template._gridElementCheckbox;
  } else if(this.type == 'submit') {
	  return Template._gridElementSubmit;
  }
});

var validateEmail = function(str) {
	var lastAtPos = str.lastIndexOf('@');
  var lastDotPos = str.lastIndexOf('.');
  if(lastAtPos < lastDotPos && lastAtPos > 0 && str.indexOf('@@') == -1 && lastDotPos > 2 && (str.length - lastDotPos) > 2) return true
  console.log('Validation error - Email address ('+str+') seems incorrect.');
	return false;
}
var validateDate = function(str,format) {
	var mom = moment(str,format);
	if(mom.isValid() && str  === mom.format(format)) return true;
	console.log('Validation error - Date format ('+format+') incorrect. ' + mom.format(format) + ' != '  +str);
	return false;
}

Template._gridElementDate.events({
	'focusout input':function(evt,tpl) {
			var val = $(evt.currentTarget).val();
			var format = $(evt.currentTarget).attr('format').toUpperCase();
			if(val.length > 0) {
				if(validateDate(val,format)) {
					$(evt.currentTarget).parent().removeClass('grid-form-error');
				} else {
					$(evt.currentTarget).parent().addClass('grid-form-error');
				}
			} else {
				$(evt.currentTarget).parent().removeClass('grid-form-error');
			}				
	},
});

Template._gridElementNumber.events({
	'focusout input':function(evt,tpl) {
			var val = evt.currentTarget.value;
			if(parseInt(val) && val.length > 0 || parseFloat(val) && val.length > 0) {
					$(evt.currentTarget).parent().removeClass('grid-form-error');
			} else if(val.length == '0') {
					$(evt.currentTarget).parent().removeClass('grid-form-error');
			} else {
					$(evt.currentTarget).parent().addClass('grid-form-error');
			}
	},
});

Template._gridElementEmail.events({
	'focusout input':function(evt,tpl) {
			var val = evt.currentTarget.value;
			if(val.length > 0) {
				if(validateEmail(val)) {
					$(evt.currentTarget).parent().removeClass('grid-form-error');
				} else {
					$(evt.currentTarget).parent().addClass('grid-form-error');
				}		
			} else {
					$(evt.currentTarget).parent().removeClass('grid-form-error');
			}
	},
});
