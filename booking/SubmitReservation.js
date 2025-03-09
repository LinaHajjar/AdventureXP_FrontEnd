const bookingConfirm = document.querySelector("#bookingForm");

bookingConfirm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(bookingConfirm);
    let bookingOrder = Object.fromEntries(data);

    // Konverter 'activity'-feltet til et objekt med en 'name'-property
    bookingOrder.activity = bookingOrder.activity && bookingOrder.activity.trim() !== ""
        ? { name: bookingOrder.activity }
        : null;

    // Konverter 'candy'-feltet til et objekt, hvis der er valgt slik; ellers sættes det til null.
    bookingOrder.candy = bookingOrder.candy && bookingOrder.candy.trim() !== ""
        ? { name: bookingOrder.candy }
        : null;

    console.log(bookingOrder);

    fetch("http://localhost:8080/bookings/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingOrder),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Fejl ved gemning af booking");
            }
            return response.text(); // Forventer en tekstbesked
        })
        .then(message => {
            // Vis evt. en succesbesked til brugeren
            document.getElementById("message").textContent = "Booking oprettet!";
        })
        .catch(error => {
            console.error("Error:", error);
        });
});