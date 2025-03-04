function fetchALl() {
    fetch("http://localhost:8080/bookings/all")
        .then(reponse => reponse.json())
        .then(data => {
            console.log(data)
        })
}


fetchALl()