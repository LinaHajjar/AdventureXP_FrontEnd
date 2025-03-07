document.addEventListener("DOMContentLoaded", function () {
    fetchBookings();
});

function fetchBookings(){
    fetch("http://localhost:8080/bookings/all")
        .then(response=>response.json())
        .then(data=>{
            displayBookings(data);
        })
        .catch(error =>{
            console.error("error during reading the Reservations!", error);
        });
}

function displayBookings(bookings) {
    const tbody = document.querySelector(".activity-table tbody");
    tbody.innerHTML = ""; // Clears the table to prevent duplicates

    bookings.forEach(booking => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${booking.bookingId}</td>
            <td>${booking.phone}</td>
            <td>${booking.firstName}</td>
            <td>${booking.lastName}</td>
            <td>${booking.email}</td>
            <td>${booking.bookingDate}</td>
            <td>${booking.bookingTime}</td>
            <td>${booking.activity ? booking.activity.name : "N/A"}</td> 
            <td>${booking.numberOfGuests}</td>
            <td>${booking.candy ? booking.candy.name : "N/A"}</td>

            <!-- Ensure correct variable reference for buttons -->
            <td><button class="btn btn-delete" onclick="deleteBooking('${booking.phone}')">Delete</button></td>
            <td><button class="btn btn-edit" onclick="editBooking('${booking.phone}')">Edit</button></td>
        `;

        tbody.appendChild(row);
    });
}



//Method to delete a reservation: