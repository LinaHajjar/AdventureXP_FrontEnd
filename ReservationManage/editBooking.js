document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const phoneNumber = urlParams.get("phone");

    if (phoneNumber) {
        fetchPhoneDetails(phoneNumber);
    } else {
        console.log("Phone number not provided yet.");
    }
});


function fetchPhoneDetails(phone) {


    phone = phone.trim(); // Remove extra spaces/newlines
    phone = encodeURIComponent(phone); // Encode special characters

    fetch(`http://localhost:8080/bookings/editBooking/${phone}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Fetched Booking Data:", data);  // Debugging
            loadBookingData(data);
        })
        .catch(error => {
            console.error("Error fetching booking details:", error);
            alert("Failed to fetch booking details. Check the phone number.");
        });
}

function loadBookingData(booking) {
    document.getElementById("bookingId").value = booking.bookingId || "";
    document.getElementById("firstName").value = booking.firstName || "";
    document.getElementById("lastName").value = booking.lastName || "";
    document.getElementById("email").value = booking.email || "";
    document.getElementById("phone").value = booking.phone || "";
    document.getElementById("activity").value = booking.activity ? booking.activity.name : "";
    document.getElementById("candy").value = booking.candy ? booking.candy.candyId : "";
    document.getElementById("numberOfGuests").value = booking.numberOfGuests || "";
    document.getElementById("bookingDate").value = booking.bookingDate || "";
    document.getElementById("bookingTime").value = booking.bookingTime || "";
}

function updatedBooking() {
    const pphone = document.getElementById("phone").value.trim();

    let phone = encodeURIComponent(pphone); // Encode special characters

    if (!phone) {
        alert("Phone number is required.");
        return;
    }



    const activityName = document.getElementById("activity").value;
    const candyName = document.getElementById("candy").value;
    const candyPrice = document.getElementById("candyPrice").value;


    const updatedBooking = {
        bookingId: document.getElementById("bookingId").value,
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        phone: phone,  // Ensure consistency
        activity: {
            name: activityName  // Send activity as an object with a name
        },
        candy: {
            name: candyName,
            price: candyPrice
        },
        numberOfGuests: parseInt(document.getElementById("numberOfGuests").value) || 0,
        bookingDate: document.getElementById("bookingDate").value,
        bookingTime: document.getElementById("bookingTime").value
    };


    console.log("Sending Updated Booking:", JSON.stringify(updatedBooking, null, 2));

    fetch(`http://localhost:8080/bookings/editBooking/${phone}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedBooking)
    })
        .then(response => {
            // Check if the response is successful
            if (!response.ok) {
                console.error("Failed response: ", response.status, response.statusText);

                // Check if the response is JSON
                const contentType = response.headers.get("Content-Type");
                if (contentType && contentType.includes("application/json")) {
                    return response.json().then(errorData => {
                        throw new Error(errorData.message || "Unknown error occurred.");
                    });
                } else {
                    return response.text().then(text => {
                        throw new Error(`Server responded with non-JSON data: ${text}`);
                    });
                }
            }

            // Handle success
            alert("Booking updated successfully!");
            window.location.href = "HomeBooking.html";
        })
        .catch(error => {
            console.error("Error updating booking:", error);
            alert(`Failed to update booking. Error: ${error.message}`);
        });
}

function editBooking(phoneNumber) {
    window.location.href = `editBooking.html?phone=${phoneNumber}`;
}


