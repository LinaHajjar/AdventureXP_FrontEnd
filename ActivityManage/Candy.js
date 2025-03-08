addEventListener('DOMContentLoaded', () => {
    fetch("http://localhost:8080/candy/all")
        .then(response => response.json())
        .then(data => {
            displayCandies(data);
            console.log(data);
        });
});

function displayCandies(candies) {
    const candyContainer = document.querySelector(".all-candies");
    candyContainer.innerHTML = "";

    candies.forEach(candie => {
        const candyDiv = document.createElement("div");
        candyDiv.classList.add("candy-item");

        candyDiv.innerHTML = `
        <h2>${candie.name}</h2>
        <p>Price: <span class="price">${candie.price.toFixed(2)}</span> kr.</p>
        <input type="number" class="edit-price" value="${candie.price}" style="display:none;">
        <button class="edit-btn">Edit</button>
        <button class="save-btn" style="display:none;">Save</button>
        `;

        const editBtn = candyDiv.querySelector(".edit-btn");
        const saveBtn = candyDiv.querySelector(".save-btn");
        const priceText = candyDiv.querySelector(".price");
        const priceInput = candyDiv.querySelector(".edit-price");

        editBtn.addEventListener("click", () => {
            priceText.style.display = "none"; // Hide text
            priceInput.style.display = "inline"; // Show input field
            editBtn.style.display = "none"; // Hide "Edit" button
            saveBtn.style.display = "inline"; // Show "Save" button
        });

        saveBtn.addEventListener("click", () => {
            const newPrice = parseFloat(priceInput.value);
            if (isNaN(newPrice) || newPrice < 0) {
                alert("Invalid price!");
                return;
            }

            fetch(`http://localhost:8080/candy/update/${candie.name}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ price: newPrice })
            })
                .then(response => response.json())
                .then(updatedCandy => {
                    priceText.textContent = updatedCandy.price.toFixed(2); // Update displayed price
                    priceText.style.display = "inline"; // Show updated price
                    priceInput.style.display = "none"; // Hide input field
                    editBtn.style.display = "inline"; // Show "Edit" button
                    saveBtn.style.display = "none"; // Hide "Save" button
                });
        });

        candyContainer.appendChild(candyDiv);
    });
}
