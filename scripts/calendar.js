

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
      events: [
        {
          // House not yet ready.
          start: "2023-01-01",
          end: "2023-04-01",
          display: "background",
          color: "grey",
        },
        {
          // House already booked.
          start: "2023-05-15",
          end: "2023-05-22",
          display: "background",
          color: "red",
        },
      ],
      select: function (info) {
        var startDate = moment(info.start).format("YYYY-MM-DD");
        var endDate = moment(info.end)
          .subtract(1, "days")
          .format("YYYY-MM-DD");
        document.getElementById("start").value = startDate;
        document.getElementById("end").value = endDate;
      },
    });
    calendar.render();
  });