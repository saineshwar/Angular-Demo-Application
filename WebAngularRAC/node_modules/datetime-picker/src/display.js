Picker.prototype.show = function() {
  var elHeight = this.$el.outerHeight(true);
      elBottom = elHeight + this.$el.offset().top,
      elLeft   = this.$el.offset().left;

  this.$picker.find('.remove').toggleClass('hidden', !this.savedVal);

  this.$picker.css({
    top: elBottom + 5 + 'px',
    left: elLeft + 'px',
    position: 'absolute'
  });

  this.closeAll();
  this.$body.append(this.$picker);

  var pickerHeight = this.$picker.outerHeight(true);
  var pickerBottom = pickerHeight + this.$picker.offset().top;

  if (pickerBottom > window.innerHeight) {
    this.$picker.css({
      top: this.$el.offset().top - pickerHeight + 5 + 'px',
      position: 'absolute'
    });
  }
};

Picker.prototype.render = function() {
  var options = $.extend({},
    this.dateTime(),
    { val: this._val },
    this.options);

  return $(t(this.options.template, options));
};

Picker.prototype.closeAll = function() {
  $('#datepicker').detach();
};

Picker.prototype.close = function() {
  this.$picker.detach();
};
