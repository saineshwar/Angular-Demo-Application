Picker.prototype.delegateEvents = function(events, $el) {
  for(var key in events) {
    var match     = key.match(/^(\S+)\s*(.*)$/);
    var eventName = match[1];
    var handler   = match[2];
    var method    = events[key];

    $el.on(eventName, handler, method.bind(this));
  }
};

Picker.prototype.handlePickerClose = function() {
  var self = this;

  var handler = function(e) {
    var isEl       = !!$(e.target).closest(self.$el).length,
        isDetached = !$(document).find(e.target).length,
        isPicker   = !!$(e.target).closest('#datepicker').length;

    if (isEl || isDetached || isPicker) return;
    this.close();
  };

  $(document).on('click', handler.bind(this));

  $(document).on('keyup', function(e) {
    // Esc
    if (e.which === 27) this.close();
  }.bind(this));
};
