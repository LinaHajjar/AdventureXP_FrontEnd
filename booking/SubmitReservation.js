document.getElementById("submit").addEventListener("click", function() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email =document.getElementById("email").value;
    const phone =document.getElementById("phone").value;
    const activity = document.getElementById("activity").value;
    const numberOfGuests = document.getElementById("numberParticipants").value;
    const bookingDate = document.getElementById("bookingDate").value;
    const bookingTime = document.getElementById("bookingTime").value;

    // Validate that all the inf are given
    if (!bookingDate || !activity || !bookingTime || !firstName || !lastName || !numberOfGuests) {
        alert("Please fill in all fields.");
        return;
    }

    // Create an object with the form data
    const bookingData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        activity: activity,
        numberOfGuests: numberOfGuests,
        bookingDate: bookingDate,
        bookingTime: bookingTime,
    };

    // Send data to backend (for example, using a POST request)
    fetch("http://localhost:8080/booking", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
    })
        .then(response => response.json())
        .then(data => {
            console.log("Booking successful:", data);
            // Optionally show a confirmation message or reset the form
            alert("Booking submitted successfully!");
            document.getElementById("booking-form").reset(); // Reset the form
        })
        .catch(error => {
            console.error("Error submitting booking:", error);
            alert("An error occurred while submitting the booking.");
        });
});
