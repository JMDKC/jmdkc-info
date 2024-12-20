// Populate books table
function populateBooksTable() {
    fetch("books.json")
        .then(response => response.json())
        .then(data => {
            const booksTableBody = document.querySelector("#books-table tbody");
            booksTableBody.innerHTML = ""; // Clear placeholder text
            data.forEach(book => {
                const row = `
                    <tr>
                        <td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${formatDate(book.dateStarted)}</td>
                        <td>${formatDate(book.dateFinished)}</td>
                    </tr>
                `;
                booksTableBody.innerHTML += row;
            });
        })
        .catch(error => console.error("Error loading books data:", error));
}

// Populate art table
function populateArtTable() {
    fetch("art.json")
        .then(response => response.json())
        .then(data => {
            const artTableBody = document.querySelector("#art-table tbody");
            artTableBody.innerHTML = ""; // Clear placeholder text
            data.forEach(art => {
                const row = `
                    <tr>
                        <td>${art.title}</td>
                        <td>${art.gallery}</td>
                        <td>${formatDate(art.date)}</td>
                    </tr>
                `;
                artTableBody.innerHTML += row;
            });
        })
        .catch(error => console.error("Error loading art data:", error));
}

// Populate concerts table
function populateConcertsTable() {
    fetch("concerts.json")
        .then(response => response.json())
        .then(data => {
            const concertsTableBody = document.querySelector("#concerts-table tbody");
            concertsTableBody.innerHTML = ""; // Clear placeholder text
            data.forEach(concert => {
                const row = `
                    <tr>
                        <td>${concert.title}</td>
                        <td>${concert.composers}</td>
                        <td>${concert.conductor}</td>
                        <td>${concert.cast}</td>
                        <td>${concert.venue}</td>
                        <td>${formatDate(concert.date)}</td>
                    </tr>
                `;
                concertsTableBody.innerHTML += row;
            });
        })
        .catch(error => console.error("Error loading concerts data:", error));
}

// Populate weightlifting competition results table
function populateWeightliftingTable() {
    fetch("comp-results.json")
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector("#comp-results tbody");
            tableBody.innerHTML = ""; // Clear placeholder text
            data.forEach(result => {
                const row = `
                    <tr>
                        <td>${result.where}</td>
                        <td>${formatDate(result.date)}</td>
                        <td>${result.name}</td>
                        <td>${result.snatch}</td>
                        <td>${result.cleanAndJerk}</td>
                        <td>${result.total}</td>
                        <td>${result.myWeight}</td>
                        <td>${result.sinclair}</td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => console.error("Error loading weightlifting data:", error));
}

// Populate lifts dropdown
function populateLiftsDropdown() {
    fetch("lifts.json")
        .then(response => response.json())
        .then(data => {
            const liftDropdown = document.querySelector("#lift");
            liftDropdown.innerHTML = ""; // Clear placeholder text
            const uniqueLifts = [...new Set(data.map(lift => lift.lift))];
            uniqueLifts.forEach(lift => {
                const option = `<option value="${lift}">${lift}</option>`;
                liftDropdown.innerHTML += option;
            });
        })
        .catch(error => console.error("Error loading lifts data:", error));
}

// Show best lift
function showBestLift() {
    const liftDropdown = document.querySelector("#lift");
    const selectedLift = liftDropdown.value;

    fetch("lifts.json")
        .then(response => response.json())
        .then(data => {
            const bestLift = data
                .filter(lift => lift.lift === selectedLift)
                .reduce((max, current) => (current.weight > max.weight ? current : max), { weight: 0 });

            const resultDiv = document.querySelector("#result");
            if (bestLift.weight > 0) {
                resultDiv.style.display = "inline";
                resultDiv.innerHTML = `${bestLift.weight}kg (${formatDate(bestLift.date)}) <a href="#" id="reset-link">(reset)</a>`;
                
                // Add reset link functionality
                const resetLink = document.querySelector("#reset-link");
                resetLink.addEventListener("click", (event) => {
                    event.preventDefault();
                    resultDiv.style.display = "none";
                });
            } else {
                resultDiv.style.display = "none";
            }
        })
        .catch(error => console.error("Error finding best lift:", error));
}

// See More functionality
function addSeeMoreButton(button) {
    button.addEventListener("click", (event) => {
        event.preventDefault();
        const section = button.dataset.section;
        const table = document.querySelector(`#${section}-table`);
        table.classList.toggle("expanded");

        button.textContent = table.classList.contains("expanded") ? "See Less" : "See More";
    });
}

// Format date to YYYY-MM-DD
function formatDate(date) {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

// Initialize tables and dropdowns
document.addEventListener("DOMContentLoaded", () => {
    populateBooksTable();
    populateArtTable();
    populateConcertsTable();
    populateWeightliftingTable();
    populateLiftsDropdown();

    // Add See More functionality to tables
    document.querySelectorAll(".see-more").forEach(addSeeMoreButton);

    // Add functionality to View Best Lift button
    document.querySelector("#view-lift-btn").addEventListener("click", showBestLift);
});
