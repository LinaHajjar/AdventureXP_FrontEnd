function searchBooking() {
    const phone = document.getElementById("phone").value;  // Get the phone value from the input

    let bookingElement = document.getElementById("bookingDetails");

    if (!bookingElement) {
        bookingElement = document.createElement("div");
        bookingElement.id = "bookingDetails";
        document.body.appendChild(bookingElement);
    }

    // Corrected URL to use phone in the path
    fetch(`http://localhost:8080/bookings/editBooking/${phone}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Booking not found");
            }
            return response.json();
        })
        .then(data => {
            console.log("Booking successfully found", data);

            const bookinghtml = `
            <h2>Booking Details</h2>
            <p><strong>Booking Id: </strong> ${data.bookingId || 'not available'}</p>
            <p><strong>First Name: </strong> ${data.firstName || 'not available'} </p>
            <p><strong>Last Name: </strong> ${data.lastName || 'not available'}</p>
            <p><strong>Email: </strong> ${data.email || 'not available'}</p>
            <p><strong>Phone: </strong> ${data.phone || 'not available'}</p>
            <p><strong>Activity: </strong> ${data.activity ? data.activity.name : 'not available'}</p>
            <p><strong>Number of Guests: </strong> ${data.numberOfGuests || 'not available'}</p>
            <p><strong>Booking Date: </strong> ${data.bookingDate || 'not available'}</p>
            <p><strong>Booking Time: </strong> ${data.bookingTime || 'not available'}</p>
        `;

            bookingElement.innerHTML = bookinghtml;
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

