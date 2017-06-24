Picker.prototype.initializeCalendar = function() {
  this.calendarEvents = {
    'changeDate': this.onCalendarChangeDate
  };

  this.$calendar = this.$picker.find('.calendar').datepicker({
    startDate: '-0d'
  });

  this.updateCalendar();
  this.delegateEvents(this.calendarEvents, this.$calendar);
};

Picker.prototype.updateCalendar = function() {
  this.$calendar.datepicker('update', this.$date.val());
};

Picker.prototype.onCalendarChangeDate = function(e) {
  var date = e.format();

  if (date) {
    this.$date.val(date);
    this.setDateTime(this.serialize());
  }
};
