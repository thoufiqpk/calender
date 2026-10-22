
function generateCalendar() {
    const yearInput = document.getElementById("year").value;
    const monthInput = document.getElementById("month").value;

    const year = Number(yearInput);
    const month = Number(monthInput);

    const calendar = document.getElementById("calendar");
    const title = document.getElementById("calendarTitle");

    if (yearInput === "" || !Number.isSafeInteger(year) ||
        year < 1 || year > 275760 || monthInput === "") {
        alert("Please enter a valid year and select a month.");
        return;
    }

    // Find the first weekday and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const monthNames = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];

    title.textContent = monthNames[month] + " " + year;

    let html = "<table>";

    // Display weekdays
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    html += "<tr>";

    for (let day of weekdays) {
        html += "<th>" + day + "</th>";
    }

    html += "</tr><tr>";

    // Add empty cells before the first date
    for (let i = 0; i < firstDay; i++) {
        html += "<td></td>";
    }

    const today = new Date();

    // Display dates
    for (let date = 1; date <= daysInMonth; date++) {
        const isToday =
            date === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

        if (isToday) {
            html += '<td class="today">' + date + "</td>";
        } else {
            html += "<td>" + date + "</td>";
        }

        // Start a new row after Saturday
        if ((firstDay + date) % 7 === 0 &&
            date !== daysInMonth) {
            html += "</tr><tr>";
        }
    }

    html += "</tr></table>";

    calendar.innerHTML = html;
}

function resetCalendar() {
    document.getElementById("year").value = "";
    document.getElementById("month").value = "";
    document.getElementById("calendarTitle").textContent = "";
    document.getElementById("calendar").innerHTML = "";
}
