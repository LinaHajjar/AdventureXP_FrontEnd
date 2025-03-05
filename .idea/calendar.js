document.addEventListener("DOMContentLoaded", function () {
    const calendarBody = document.getElementById("calendar-body");
    const currentMonthText = document.getElementById("current-month");
    const prevMonthBtn = document.getElementById("prev-month");
    const nextMonthBtn = document.getElementById("next-month");

    const bookingInfo = document.getElementById("booking-info");
    const selectedDateText = document.getElementById("selected-date");
    const bookingList = document.getElementById("booking-list");

    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth(); // January = 0, December = 11

    function renderCalendar(year, month) {
        const firstDay = new Date(year, month, 1).getDay(); // Day of the week (0 = Sunday)
        const daysInMonth = new Date(year, month + 1, 0).getDate(); // Total days in month

        currentMonthText.textContent = new Date(year, month).toLocaleString("default", { month: "long", year: "numeric" });

        let calendarHtml = "";
        let currentDay = 1;

        for (let week = 0; week < 6; week++) {
            calendarHtml += "<tr>";

            for (let day = 0; day < 7; day++) {
                if (week === 0 && day < firstDay) {
                    calendarHtml += "<td></td>"; // Empty cells before the 1st
                } else if (currentDay <= daysInMonth) {
                    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(currentDay).padStart(2, "0")}`;
                    calendarHtml += `<td data-date="${dateString}">${currentDay}</td>`;
                    currentDay++;
                }
            }

            calendarHtml += "</tr>";
        }

        calendarBody.innerHTML = calendarHtml;

        // Add event listener for clicking on a date
        document.querySelectorAll("td[data-date]").forEach(td => {
            td.addEventListener("click", function () {
                let selectedDate = this.dataset.date;
                fetchBookings(selectedDate);
            });
        });
    }

    // Fetch bookings for a selected date
    function fetchBookings(date) {
        fetch(`http://localhost:8080/bookings/by-date?date=${date}`)

            .then(response => response.json())
            .then(bookings => {
                selectedDateText.textContent = date;
                bookingList.innerHTML = "";

                if (bookings.length === 0) {
                    bookingList.innerHTML = "<li>No bookings</li>";
                } else {
                    bookings.forEach(booking => {
                        let li = document.createElement("li");
                        li.textContent = `${booking.firstName} ${booking.lastName} - ${booking.activity.name} at ${booking.bookingTime}`;
                        bookingList.appendChild(li);
                    });
                }

                bookingInfo.classList.remove("hidden");
            })
            .catch(error => console.error("Error fetching bookings:", error));
    }

    // Previous Month Button
    prevMonthBtn.addEventListener("click", function () {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentYear, currentMonth);
    });

    // Next Month Button
    nextMonthBtn.addEventListener("click", function () {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentYear, currentMonth);
    });

    // Initial Calendar Render
    renderCalendar(currentYear, currentMonth);
});
