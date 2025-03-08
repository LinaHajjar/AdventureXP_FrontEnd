document.addEventListener("DOMContentLoaded", function(){
    const urlParams = new URLSearchParams(window.location.search);
    const instructor_id=urlParams.get('instructor_id');

    if (instructor_id){
        fetchInstructorShifts(instructor_id);
    } else {
        document.getElementById('shift-table-body').innerHTML = "<tr><td colspan='5'>The trainer is not provided.</td></tr>";
    }

});

function fetchInstructorShifts(instructor_id){
    fetch(`http://localhost:8080/instructors/instructor/${instructor_id}/shifts`)
        .then(response => response.json())
        .then(shifts => {
            const tbody =document.getElementById('shift-table-body');
            tbody.innerHTML=""; // Clear any existing content

            if (shifts.length === 0){
                tbody.innerHTML = "<tr><td colspan='5'>No shifts found for this instructor.</td></tr>";
                return;
            }

            shifts.forEach(shift => {
                const row = document.createElement("tr");
                const date =new Date(shift.date);
                row.innerHTML= `
                    <td>${shift.id}</td>
                    <td>${shift.activity.name}</td>
                    <td>${date.toLocaleDateString()}</td>
                 
                `;
                tbody.appendChild(row);
            });
        })

        .catch(error=>{
            console.error("Error during fetching the shifts: ", error);
            document.getElementById('shift-table-body').innerHTML= "<tr><td colspan='5'>Error fetching shifts.</td></tr>";
        });
}