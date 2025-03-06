document.getElementById("bookingForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
        const description = document.getElementById("description").value;
        const price = document.getElementById("price").value;
        const duration = document.getElementById("duration").value;

        //Validate that all the inf are given
        if (!name || !description || !price || !duration) {
            alert("Please fill in all fields.");
            return;
        };


        //Create an object with the form data
        const newActivity = {
            duration: duration,
            price: price,
            description: description,
            name: name,
        };

        fetch("http://localhost:8080/activities/activity", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newActivity)
        })
            .then(response =>{
                if(!response.ok){
                    throw new Error("Failed to add activity");
                }
                return response.json();
            })

            .then(data => {
                console.log("Response data:", data);  // Debugging
                document.getElementById("message").textContent = "The new activity is added successfully!!";
                document.getElementById("bookingForm").reset();
            })
            .catch(error => {
                console.error("error during adding the activity:", error); //Debugging
                document.getElementById("message").textContent="error during adding the activity";
            });
    }
);

//NOTER TIL LINJE 3:
//WHY I wrote:
// document.getElementById("bookingForm").addEventListener("submit", function(event) {
//     event.preventDefault();
// instead of: document.getElementById("submit").addEventListener("click", function() {
//BECAUSE:
//Since this is a button inside a <form>, clicking it triggers form submission before your JavaScript runs.
//As a result, the JavaScript fetch request might not execute properly.
// TO Fix this: Change click to submit and prevent the form from submitting by default: