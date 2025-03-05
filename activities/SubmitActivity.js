document.getElementById("submit").addEventListener("click", function() {
        const name = document.getElementById("name").value;
        const description = document.getElementById("description").value;
        const price = document.getElementById("price").value;
        const duration = document.getElementById("duration").value;

        //Validate that all the inf are given
        if (!name || !description || !price || !duration) {
            alert("Please fill in all fields.");
            return;
        }
        ;

        //Create an object with the form data
        const newActivity = {
            name: name,
            description: description,
            price: price,
            duration: description,
        };

        fetch("http://localhost:8080/api/activity", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newActivity)
        })
            .then(response => response.json())
            .then(data => {
                document.getElementById("message").textContent = "The new activity is added successfully!!";
                document.getElementById("bookingForm").reset();
            })
            .catch(error => {
                console.error("error during adding the activity:", error);
                document.getElementById("message").textContent="error during adding the activity";
            });
    }
);
