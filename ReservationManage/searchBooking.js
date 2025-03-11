function searchBooking() {
    const phone = document.getElementById("phone").value;

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

            // Store the booking details in localStorage
            localStorage.setItem("bookingData", JSON.stringify(data));

            // Open new page to display booking details
            window.location.href = `searchBookingInfo.html?phone=${phone}`;
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Booking not found!");
        });
}
