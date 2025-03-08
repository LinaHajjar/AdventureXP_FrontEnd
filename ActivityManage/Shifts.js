document.addEventListener("DOMContentLoaded", async function(){
    try{
        const response = await fetch("http://localhost:8080/instructors/all")
        const instructors= await response.json();
        const select = document.getElementById("selectInstructor");

        instructors.forEach(instructor =>{
            const option = document.createElement("option");
            option.value = instructor.instructor_id;
            option.textContent = `${instructor.first_name} ${instructor.last_name}`;
            select.appendChild(option);

            }
        );
    }catch (error){
        console.error("error fetching instructors:", error)
    }
})


async function fetchShifts() {
    const instructor_id = document.getElementById("selectInstructor").value;
    if (!instructor_id) return;

    try {
        const response =await fetch(`http://localhost:8080/instructors/instructor/${instructor_id}/shifts`);
        const shifts = await response.json();
        const container = document.getElementById("shiftsContainer");

        container.innerHTML = ""; // Clear previous data

        if (shifts.length === 0) {
            container.innerHTML = "<p>No assigned shifts.</p>";
            return;
        }

        shifts.forEach(shift => {
            const shiftElement = document.createElement("p");
            shiftElement.textContent = `Date: ${shift.date}, Activity: ${shift.activity ? shift.activity.name : "N/A"}`; // Handle null activity
            container.appendChild(shiftElement);
        });

    } catch (error) {
        console.error("Error fetching shifts:", error);
    }
}