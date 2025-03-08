document.addEventListener("DOMContentLoaded", function(){
    fetchInstructors();
})

function fetchInstructors() {
    fetch("http://localhost:8080/instructors/all")
        .then(response => response.json())
        .then(instructors => {
            const tbody = document.querySelector(".activity-table tbody");
            tbody.innerHTML = "";

            instructors.forEach(instructor => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${instructor.instructor_id}</td>
                    <td>${instructor.first_name}</td>
                    <td>${instructor.last_name}</td>
                    <td>${instructor.instructor_phone}</td>
                    <td>${instructor.instructor_email}</td>
                    <td>
                        <button className="btn btn-edit" onClick="seAllShifts(${instructor.instuctor_id})">Shifts</button>
                    </td>
                `;
                tbody.appendChild(row);

            });
        })

        .catch(error => {
            console.error("error during reading the list of trainers.", error);
        });
}

function seAllShifts(instructor_id){
    console.log("Instructor ID being passed:", instructor_id); // Add this line
    window.location.href=`shifts.html?instructor_id=${instructor_id}`; //    // Redirect to shifts.html with the instructor ID as a URL parameter
}