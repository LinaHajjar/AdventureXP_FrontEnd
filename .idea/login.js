const btn = document.querySelector(".login-form");

btn.addEventListener("submit", (event) => {
event.preventDefault();

    const data = new FormData(btn);
    let user = Object.fromEntries(data);
    console.log(user);


    fetch("http://localhost:8080/employees/login", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(user)
    })
        .then(response => response.text())
        .then(message => {
            if (message === "Welcome activity manager"){
                window.location.href = "Activity.html"
            } else if (message === "Welcome reservation manager"){
                window.location.href = "Reservation.html"
            } else {
                alert("Login failed")
            }
        })

})