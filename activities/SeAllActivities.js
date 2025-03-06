document.addEventListener("DOMContentLoaded", function () {
    fetchActivities();
});

function fetchActivities(){
    fetch("http://localhost:8080/activities/all")
        .then(response=>response.json())
        .then(data=>{
            displayActivities(data);
        })
        .catch(error =>{
            console.error("error during reading the activities!", error);
        });
}

function displayActivities(activities) {
    const tbody = document.querySelector(".activity-table tbody");
    tbody.innerHTML = ""; // Rydder tabellen, så den ikke gentages ved reload


    activities.forEach(activities => {
        const row = document.createElement("tr");

        row.innerHTML = `
        <td>${activities.name}</td>
        <td>${activities.description}</td>
        <td>${activities.price}</td>
        <td>${activities.duration}</td>
        <td><button onclick="deleteActivity('${activities.name}')">Delete</button></td>
        <td><button onclick="editActivity('${activities.name}')">Edit</button></td>
    `;

        tbody.appendChild(row);

    });

}


//to delete an activity:
function deleteActivity(activityName){
    if(confirm("Are you sure you want to delete this activity?")){
        fetch(`http://localhost:8080/activities/activity/${activityName}`,{
            method:"DELETE"
        })
            .then(response =>{
                if(response.ok){
                    fetchActivities();//update the new list after deleting
                } else {
                    alert("Error: could not delete the activity");
                }
            })
            .catch(error=>console.error("Error during deleting: ", error));
    }
}


function editActivity(activityName) {
    window.location.href = `editActivity.html?name=${activityName}`;
}