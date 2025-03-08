document.addEventListener("DOMContentLoaded", function(){
    fetchInstructors();
})

function fetchInstructors() {
    fetch("http://localhost:8080/instructors/all")
        .then(response => response.json())
        .then(data => {
            fecthInstructors(data)
            console.log(data)
        })

}


function fecthInstructors(instructors) {
    const container = document.querySelector(".instructors-container");
    container.innerHTML = "";

    instructors.forEach(instructor => {

        const instructorItem = document.createElement("div")
        instructorItem.classList.add("instructor-item");

        instructorItem.innerHTML = `
        <img src="3c97bed4-8337-43ae-b41b-372ae7e4e37b.webp">
        <h2>Id: ${instructor.instructor_id} Fullname: ${instructor.first_name} ${instructor.last_name}</h2>
        <p>Mail: ${instructor.instructor_email} Phone number: ${instructor.instructor_phone}</p>
        <p>Adress: ${instructor.instructor_address}</p>
        <button class="edit-instructor" data-id="${instructor.instructor_id}">Edit</button>
        `

        container.append(instructorItem)

    })



    document.querySelectorAll(".edit-instructor").forEach(button => {
        button.addEventListener("click", function(){

            const id = this.getAttribute("data-id");
            window.location.href = `EditInstructor.html?instructor_id=${id}`;


        })
    })



}









function seAllShifts(instructor_id){
    console.log("Instructor ID being passed:", instructor_id); // Add this line
    window.location.href=`shifts.html?instructor_id=${instructor_id}`; //    // Redirect to shifts.html with the instructor ID as a URL parameter
}