function editBooking(){

 fetch(`http://localhost:8080/bookings/${bookingId}`, {
     method: "PUT",
     headers: {"Content-Type": "application/json"},
     body: JSON.stringify(booking)

    })

     .then(response=> {

         if(!response.ok) {
             throw new Error("did not find booking")
         }
         return response.json()
         })
         .then (data =>{
             console.log("user was succesfully updated", data)

         })
     .catch(error =>{
         console.error("error:", error)
    })

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







