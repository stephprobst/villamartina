document.addEventListener("DOMContentLoaded", function () {
var calendarEl = document.getElementById("calendar");
var calendar = new FullCalendar.Calendar(calendarEl, {
  initialView: "dayGridMonth",
  selectable: true,
  selectOverlap: false,
  headerToolbar: {
    left: "prev,next",
    center: "title",
    right: "dayGridMonth,dayGridYear", // user can switch between the two
  },
  events: "config/calendar.json", // load events from external JSON file
  select: function (info) {
    var startDate = moment(info.start).format("YYYY-MM-DD");
    var endDate = moment(info.end).subtract(1, "days").format("YYYY-MM-DD");
    document.getElementById("start").value = startDate;
    document.getElementById("end").value = endDate;
    calculatePrice();
  },
});
calendar.render();
});