// Load the editform.html into the container
fetch('editform.html')
    .then(response => response.text())
    .then(data => {
        console.log('Form data loaded:', data);  // Log the form HTML to check if it's loaded correctly
        document.getElementById('form-container').innerHTML = data;
    })
    .catch(error => console.error('Error loading form:', error));

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#editBookingForm");

    // Check if the form is found
    if (!form) {
        console.error('Form not found!');
        return; // Exit early if form is not found
    }

    // Select form fields
    const bookingId = document.querySelector("#bookingId");
    const firstName = document.querySelector("#firstName");
    const lastName = document.querySelector("#lastName");
    const email = document.querySelector("#email");
    const phone = document.querySelector("#phone");
    const activity = document.querySelector("#activity");
    const numberOfGuests = document.querySelector("#numberOfGuests");
    const bookingDate = document.querySelector("#bookingDate");
    const bookingTime = document.querySelector("#bookingTime");

    // Get booking ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const bookingIdValue = urlParams.get("id");

    if (bookingIdValue) {
        fetch(`http://localhost:8080/editBooking/${bookingIdValue}`) // Ensure this endpoint returns JSON
            .then(response => {
                if (!response.ok) {
                    throw new Error("Booking not found");
                }
                return response.json();
            })
            .then(data => {
                console.log('Booking data fetched:', data);  // Log the fetched booking data
                // Populate form fields with data
                bookingId.value = data.bookingId;
                firstName.value = data.firstName;
                lastName.value = data.lastName;
                email.value = data.email;
                phone.value = data.phone;
                activity.value = data.activity;
                numberOfGuests.value = data.numberOfGuests;
                bookingDate.value = data.bookingDate;
                bookingTime.value = data.bookingTime;
            })
            .catch(error => {
                console.error("Error fetching booking:", error);
                alert("Booking not found or error fetching data.");
            });
    }

    // Handle form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const updatedBooking = {
            bookingId: bookingId.value,
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            phone: phone.value,
            activity: activity.value,
            numberOfGuests: numberOfGuests.value,
            bookingDate: bookingDate.value,
            bookingTime: bookingTime.value,
        };

        console.log('Form submission data:', updatedBooking);  // Log the data to be submitted

        fetch(`http://localhost:8080/editBooking/${bookingId.value}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedBooking),
        })
            .then(response => {
                if (response.ok) {
                    alert("Booking updated successfully!");
                    window.location.href = "booking-success.html"; // Redirect to a confirmation page
                } else {
                    alert("Error updating booking.");
                }
            })
            .catch(error => console.error("Error:", error));
    });
});
