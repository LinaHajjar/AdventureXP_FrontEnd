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
    tbody.innerHTML = ""; // Rydder tabellen, så den ikke gentages ved reload


    bookings.forEach(booking => {
        const row = document.createElement("tr");
        const decodedPhone = decodeURIComponent(booking.phone);

        row.innerHTML = `
        <td>${booking.bookingId}</td>
        <td>${decodedPhone}</td>
        <td>${booking.firstName}</td>
        <td>${booking.lastName}</td>
        <td>${booking.email}</td>
        <td>${booking.bookingDate}</td>
        <td>${booking.bookingTime}</td>
        <td>${booking.activity.name}</td> 
        <td>${booking.numberOfGuests}</td>
        <td>${booking.candy && booking.candy.candyId ? booking.candy.name : "No Candy Selected"}</td>
                
        <td> <button class="btn btn-delete" onclick="removeBooking('${booking.phone}')">Delete</button></td>
        <td><button class="btn btn-edit" onclick="redirectToEditPage('${booking.phone}')">Edit</button></td>
        
        
    `;

        tbody.appendChild(row);

    });

}

function redirectToEditPage(phone) {

    const encodedPhone = encodeURIComponent(phone);
    window.location.href = `editBooking.html?phone=${encodedPhone}`;
}



function removeBooking(phone){
    const encodedPhone = encodeURIComponent(phone);
    window.location.href = `deleteBooking.html?phone=${encodedPhone}`;
}




/*

function redirectToEditPage(phone) {
    window.location.href = `/bookings/editBooking/${phone}`;  // Correct URL with bookings prefix
}
*/


//Method to delete a reservation: