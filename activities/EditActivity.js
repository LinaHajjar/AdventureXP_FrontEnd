


// Extract the value of the "name" parameter from the URL's query string
// and store it in the activityName variable.

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);  //window.location.search: property of the window.location object
                                                                                    // returns the query string part of the URL
                                                                    // which is the portion of the URL that comes after the question mark (?).


    const activityName = urlParams.get("name");



    if (activityName) {
        fetchActivityDetails(activityName);
    } else {
        alert("Activity name not provided.");
    }
});



function fetchActivityDetails(activityName) {
    fetch(`http://localhost:8080/activities/${activityName}`)
        .then(response => response.json())
        .then(data => {
            loadActivityData(data);
        })
        .catch(error => {
            console.error("Error fetching activity details:", error);
        });
}


//load the data of an activity object
function loadActivityData(activity) {
    document.getElementById("name").value = activity.name;
    document.getElementById("description").value = activity.description;
    document.getElementById("price").value = activity.price;
    document.getElementById("duration").value = activity.duration;
}

//update the activity with the new information and go back to the home page : SeAllActivities
function updateActivity() {
    const activityName = document.getElementById("name").value;
    const activity = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        price: parseFloat(document.getElementById("price").value),
        duration: document.getElementById("duration").value
    };

    fetch(`http://localhost:8080/activities/activity/${activityName}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(activity)
    })
        .then(response => {
            if (response.ok) {
                alert("Activity updated successfully!");
                window.location.href = "SeAllActivities.html"; // Redirect back to the list
            } else {
                alert("Failed to update activity.");
            }
        })
        .catch(error => {
            console.error("Error updating activity:", error);
        });
}