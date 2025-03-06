document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const bookingId = urlParams.get("bookingId"); // Extract bookingId from URL

    if (bookingId) {
        document.getElementById("bookingId").value = bookingId; // Set hidden input field
        fetchBookingDetails(bookingId); // Fetch booking details
    }

    // Handle form submission
    document.getElementById("editBookingForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent page reload
        editBooking();
    });
});


// Function to fetch booking details and populate form
function fetchBookingDetails(bookingId) {
    fetch(`http://localhost:8080/bookings/editBooking/${bookingId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Booking not found");
            }
            return response.json();
        })
        .then(data => {

            console.log(data)
            document.getElementById("bookingId").value = data.bookingId;
            document.getElementById("firstName").value = data.firstName;
            document.getElementById("lastName").value = data.lastName;
            document.getElementById("email").value = data.email;
            document.getElementById("phone").value = data.phone;
            document.getElementById("activity").value = data.activity;
            document.getElementById("numberOfGuests").value = data.numberOfGuests;
            document.getElementById("bookingDate").value = data.bookingDate;
            document.getElementById("bookingTime").value = data.bookingTime;
        })
        .catch(error => console.error("Error fetching booking details:", error));
}

// Function to handle editing and updating the booking
function editBooking() {
    const bookingId = document.getElementById("bookingId").value;
    if (!bookingId) {
        alert("Error: No booking ID provided.");
        return;
    }

    const updatedBooking = {
        bookingId: bookingId,
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        activity: document.getElementById("activity").value,
        numberOfGuests: document.getElementById("numberOfGuests").value,
        bookingDate: document.getElementById("bookingDate").value,
        bookingTime: document.getElementById("bookingTime").value
    };

    fetch(`http://localhost:8080/bookings/editBooking/${bookingId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedBooking)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to update booking");
            }
            return response.json();
        })
        .then(data => {
            alert("Booking successfully updated!");
            window.location.href = "/all.html"; // Redirect to reservation list page
        })
        .catch(error => {
            console.error("Error updating booking:", error);
        });
}






function deleteBooking() {

    fetch(`http://localhost:8080/bookings/${bookingId}`, {

        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(booking)

    })


        .then(response => {


            if (!response.ok) {
                throw new Error("it did not work")
            }
            return response.json()
        })
        .then(data => {
            console.log("it was succesfully added", data)
        })

        .catch(error => {
            console.error("error", error)
        })

    }




function searchBooking() {
    const bookingId = document.getElementById("bookingId").value;


    let bookingElement = document.getElementById("bookingDetails");

    if (!bookingElement) {
        bookingElement = document.createElement("div");
        bookingElement.id = "bookingDetails";
        document.body.appendChild(bookingElement);
    }



    // Make sure the URL matches the backend endpoint
    fetch(`http://localhost:8080/bookings/booking/${bookingId}`, {
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


            const bookinghtml =

                `


                <h2> booking details</h2>
                <p><strong>Booking Id: </strong> ${data.bookingId || 'not available'}</p>
                <p><strong>First Name: </strong> ${data.firstName || 'not available'} </p>
                <p> <strong>Last Name: </strong> ${data.lastName || 'not available'}</p>
                <p><strong>Email: </strong> ${data.email || 'not available'}</p>
                <p><strong>Phone: </strong> ${data.phone || 'not available'}</p>
                <p> <strong> Activity: </strong> ${data.activity || 'not available'}</p>
                <p> <strong>Name: </strong> ${data.name || 'not available'}</p>
                <p> <strong> Description</strong>${data.description || 'not available'}</p>
                <p> <strong> Price: </strong> ${data.price || 'not available'}</p>
                <p> <strong> Duration: </strong> ${data.duration || 'not available'}</p>
                <p> <strong> Number of guests: </strong> ${data.numberofGuests || 'not available'}</p>
                <p> <strong> Booking date: </strong> ${data.bookingDate || 'not available'}</p>
                <p> <strong> Booking time: </strong> ${data.bookingTime || 'not available'}</p>
                
                
                `

            ;

              bookingElement.innerHTML = bookinghtml


        })
        .catch(error => {
            console.error("Error:", error);
        });
}







