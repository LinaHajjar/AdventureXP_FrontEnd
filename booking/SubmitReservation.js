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