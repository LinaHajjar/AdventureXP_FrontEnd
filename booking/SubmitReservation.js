const bookingConfirm = document.querySelector("#bookingForm");

bookingConfirm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(bookingConfirm)
    let bookingOrder = Object.fromEntries(data);
    console.log(bookingOrder);

    fetch("http://localhost:8080/bookings/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(bookingOrder),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to save booking");
            }
            return response.text(); // Expecting text response
        })
        .then(message => {

        })

})




































/*
document.getElementById("bookingForm").addEventListener("submit", function(event) {
    event.preventDefault();

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
    };

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
    fetch("http://localhost:8080/bookings/booking", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to add the new booking");
            }
            return response.json();
        })

        .then(data => {
            console.log("Booking successful:", data); //Debugging
            document.getElementById("message").textContent ="Booking submitted successfully!!";
            document.getElementById("bookingForm").reset(); // Reset the form
        })
        .catch(error => {
            console.error("Error submitting booking:", error);
            document.getElementById("message").textContent ="An error occurred while submitting the booking.";
        });
});
*/