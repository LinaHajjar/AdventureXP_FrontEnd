document.addEventListener("DOMContentLoaded", function () {
    const bookingData = localStorage.getItem("bookingData").trim(); // Get and clean the booking data

    if (bookingData) {
        const booking = JSON.parse(bookingData); // Parse the booking data into an object
        const phoneNumber = booking.phone; // Extract the phone number from the booking object
        console.log("Phone number from localStorage: ", phoneNumber);

        if (phoneNumber) {
            fetchPhoneSearchDetails(phoneNumber); // Pass the phone number to the fetch function
        } else {
            console.log("Phone number not found in booking data.");
        }
    } else {
        console.error("Booking data not found in localStorage.");
    }
});

function fetchPhoneSearchDetails(phone) {
    phone = phone.trim(); // Remove extra spaces/newlines
    phone = encodeURIComponent(phone); // Encode special characters
    console.log("Fetching details for phone:", phone); // Debugging

    fetch(`http://localhost:8080/bookings/editBooking/${phone}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Fetched Booking Data:", data);  // Debugging
            displayBookingDetails(data);
        })
        .catch(error => {
            console.error("Error fetching booking details:", error);
            alert("Failed to fetch booking details. Check the phone number.");
        });
}


function displayBookingDetails(booking) {
    const container = document.getElementById("bookingContainer");

    container.innerHTML = `
        <p><strong>Booking ID:</strong> ${booking.bookingId}</p>
        <p><strong>FirstName:</strong> ${booking.firstName}<p/>
        <p><strong>LastName:</strong> ${booking.lastName}</p>
        <p><strong>Email:</strong> ${booking.email}</p>
        <p><strong>Phone:</strong> ${booking.phone}</p>
        <p><strong>Activity:</strong> ${booking.activity ? booking.activity.name : "N/A"}</p>
        <p><strong>Candy:</strong> ${booking.candy ? booking.candy.candyId : "N/A"} </p>
        <p><strong>Guests:</strong> ${booking.numberOfGuests}</p>
        <p><strong>Date:</strong> ${booking.bookingDate}</p>
        <p><strong>Time:</strong> ${booking.bookingTime}</p>
    `;
}




function editBooking() {
    const bookingData = localStorage.getItem("bookingData");

    // Check if bookingData is available
    if (bookingData) {
        const booking = JSON.parse(bookingData);
        const phone = booking.phone;

        if (phone) {
            const phoneNumber = phone.trim(); // Remove extra spaces/newlines
            const phoneedit = encodeURIComponent(phoneNumber); // Encode special characters

            // Redirect to the edit page with the encoded phone number
            window.location.href = `editBooking.html?phone=${phoneedit}`;
        } else {
            console.error("Phone number not found in booking data.");
        }
    } else {
        console.error("Booking data not found in localStorage.");
    }
}

