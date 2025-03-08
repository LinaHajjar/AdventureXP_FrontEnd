document.addEventListener("DOMContentLoaded", function(){
    const url = new URLSearchParams(window.location.search);
    const id = url.get("instructor_id");

        if (id){
            displayInstructor(id)
        }

    document.getElementById("edit-instructor-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevents page reload
        saveInfo();
    });

})


function displayInstructor(instructorId){

    fetch(`http://localhost:8080/instructors/${instructorId}`)
        .then(response => response.json())
        .then(data => populateInstructor(data))
        .catch(error => console.error("Error fetching instructor data:", error));


}


function populateInstructor(instructor){

    document.getElementById("instructor_id").value = instructor.instructor_id; // Readonly ID field
    document.getElementById("first_name").value = instructor.first_name;
    document.getElementById("last_name").value = instructor.last_name;
    document.getElementById("instructor_email").value = instructor.instructor_email;
    document.getElementById("instructor_phone").value = instructor.instructor_phone;
    document.getElementById("instructor_address").value = instructor.instructor_address;
}





function saveInfo(){

    const instructor_id = document.getElementById("instructor_id").value;

    const updatedInstructor = {
        instructor_id: instructor_id,
        first_name: document.getElementById("first_name").value,
        last_name: document.getElementById("last_name").value,
        instructor_email: document.getElementById("instructor_email").value,
        instructor_phone: document.getElementById("instructor_phone").value,
        instructor_address: document.getElementById("instructor_address").value,

    }

    fetch(`http://localhost:8080/instructors/update/${instructor_id}`, {

        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedInstructor),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
            alert("Updated Successfully")
            window.location.href = "SeAllInstructors.html"
        })
        .catch(error => {
            console.error("Error updating instructor:", error);
            alert("Failed to update instructor. Check console for details.");
        });



}
