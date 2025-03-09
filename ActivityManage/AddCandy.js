document.addEventListener("DOMContentLoaded", () => {
    const addCandyForm = document.getElementById("addCandyForm");

    addCandyForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const candyData = {
            name: document.getElementById("candyName").value,
            price: parseFloat(document.getElementById("candyPrice").value)
        };

        fetch("http://localhost:8080/candy/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(candyData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to add candy");
                }
                return response.json();
            })
            .then(addedCandy => {
                document.getElementById("message").textContent = "Candy added successfully!";
                addCandyForm.reset(); // Ryd formularen
                // Redirect til CandyPrices.html
                window.location.href = "CandyPrices.html";
            })
            .catch(error => {
                console.error("Error:", error);
                document.getElementById("message").textContent = "Error adding candy";
            });
    });
});
