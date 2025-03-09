document.addEventListener("DOMContentLoaded", function() {
    fetchBookingDetails();
});



function getPhoneFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("phone");  // Extracts phone number from URL
}

function fetchBookingDetails() {
    let phone = getPhoneFromURL();

    phone = encodeURIComponent(phone); // Encode special characters



    if (!phone) {
        alert("No phone number found.");
        return;
    }


    fetch(`http://localhost:8080/bookings/fetchBookingDetails/${phone}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Booking not found.");
            }
            return response.json();
        })
        .then(booking => {
            document.getElementById("bookingDetails").innerHTML = `
                        <p><strong>Phone:</strong> ${booking.phone}</p>
                        <p><strong>First name:</strong> ${booking.firstName}</p>
                        <p><strong>Last name:</strong>${booking.lastName}</p>
                        <p><strong>Date:</strong> ${booking.bookingDate}</p>
                        <p><strong>Activity:</strong> ${booking.activity.name}</p>
                        <button onclick="deleteBooking('${booking.phone}')">Delete Booking</button>

                        <button onclick="cancel()">Cancel</button>
                    `;
        })


        .catch(error => {
            document.getElementById("bookingDetails").innerHTML = `<p style="color:red;">${error.message}</p>`;
        });
}



function deleteBooking(phone) {
    if (!phone) {
        alert("No phone number found.");
        return;
    }

    const cleanedPhone = phone.replace(/\s/g, '');

    fetch(`http://localhost:8080/bookings/deleteBooking/${encodeURIComponent(phone)}`, {
        method: "DELETE"
    })
        .then(response => {
            if (response.ok) {
                alert("Booking deleted successfully.");
                 window.location.href = "HomeBooking.html"; // Redirect to bookings list

            } else {
                alert("Failed to delete booking.");
            }
        })
        .catch(error => console.error("Error:", error));
}


function cancel() {
    window.location.href = "homeBooking.html"; // Redirect to homebooking list
}
