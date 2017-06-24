$.fn[pluginName] = function (options) {
  this.each(function() {
    if (!$.data(this, pluginName)) {
      $.data(this, pluginName, new Picker(this, options));
    }
  });
  return this;
};
