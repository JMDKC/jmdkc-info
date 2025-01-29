// Populate books table
function populateBooksTable() {
    fetch("books.json")
        .then(response => response.json())
        .then(data => {
            const booksTableBody = document.querySelector("#books-table tbody");
            booksTableBody.innerHTML = "";
            data.sort((a, b) => new Date(b.dateFinished) - new Date(a.dateFinished))
                .forEach(book => {
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
            limitTableRows(booksTableBody);
        })
        .catch(error => console.error("Error loading books data:", error));
}

// Populate art table
function populateArtTable() {
    fetch("art.json")
        .then(response => response.json())
        .then(data => {
            const artTableBody = document.querySelector("#art-table tbody");
            artTableBody.innerHTML = "";
            data.sort((a, b) => new Date(b.date) - new Date(a.date))
                .forEach(art => {
                    const row = `
                        <tr>
                            <td>${art.title}</td>
                            <td>${art.gallery}</td>
                            <td>${formatDate(art.date)}</td>
                        </tr>
                    `;
                    artTableBody.innerHTML += row;
                });
            limitTableRows(artTableBody);
        })
        .catch(error => console.error("Error loading art data:", error));
}

// Populate concerts table
function populateConcertsTable() {
    fetch("concerts.json")
        .then(response => response.json())
        .then(data => {
            const concertsTableBody = document.querySelector("#concerts-table tbody");
            concertsTableBody.innerHTML = "";
            data.sort((a, b) => new Date(b.date) - new Date(a.date))
                .forEach(concert => {
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
            limitTableRows(concertsTableBody);
        })
        .catch(error => console.error("Error loading concerts data:", error));
}

// Populate weightlifting competition results table
function populateWeightliftingTable() {
    fetch("comp-results.json")
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector("#comp-results tbody");
            tableBody.innerHTML = "";
            data.sort((a, b) => new Date(b.date) - new Date(a.date))
                .forEach(result => {
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
            limitTableRows(tableBody);
        })
        .catch(error => console.error("Error loading weightlifting data:", error));
}

// Populate lifts dropdown
function populateLiftsDropdown() {
    fetch("lifts.json")
        .then(response => response.json())
        .then(data => {
            const liftDropdown = document.querySelector("#choose-lift-dropdown");
            liftDropdown.innerHTML = "";
            const uniqueLifts = [...new Set(data.map(lift => lift.lift))];
            uniqueLifts.forEach(lift => {
                const option = document.createElement("option");
                option.value = lift;
                option.textContent = lift;
                liftDropdown.appendChild(option);
            });
        })
        .catch(error => console.error("Error loading lifts data:", error));
}

// Show best lift
function showBestLift() {
    const liftDropdown = document.querySelector("#choose-lift-dropdown");
    const selectedLift = liftDropdown.value;
    const bestLiftContainer = document.querySelector("#best-lift-container");

    if (!selectedLift) {
        alert("Please select a lift!");
        return;
    }

    fetch("lifts.json")
        .then(response => response.json())
        .then(data => {
            const bestLift = data
                .filter(lift => lift.lift === selectedLift)
                .sort((a, b) => b.weight - a.weight)[0];

            if (bestLift) {
                const { weight, date } = bestLift;
                bestLiftContainer.innerHTML = `${weight}kg (${formatDate(date)}) <a href="#" id="reset-link">(reset)</a>`;
                bestLiftContainer.classList.remove("hidden");

                // Add reset functionality
                document.getElementById("reset-link").addEventListener("click", (e) => {
                    e.preventDefault();
                    bestLiftContainer.innerHTML = "";
                    bestLiftContainer.classList.add("hidden");
                });
            } else {
                bestLiftContainer.innerHTML = "No data available.";
                bestLiftContainer.classList.remove("hidden");
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
        scrollToTable(table);
    });
}

// Scroll to the top of the table
function scrollToTable(table) {
    table.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Limit rows to initial count
function limitTableRows(tableBody) {
    const rows = tableBody.querySelectorAll("tr");
    if (rows.length > 10) {
        for (let i = 10; i < rows.length; i++) {
            rows[i].classList.add("hidden-row");
        }
    }
}

// Toggle row visibility
function toggleRowVisibility(tableBody) {
    const rows = tableBody.querySelectorAll("tr");
    rows.forEach(row => row.classList.toggle("hidden-row"));
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
    document.querySelectorAll(".see-more").forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            const section = button.dataset.section;
            const tableBody = document.querySelector(`#${section}-table tbody`);

            if (button.textContent === "See More") {
                button.textContent = "See Less";
                toggleRowVisibility(tableBody);
            } else {
                button.textContent = "See More";
                toggleRowVisibility(tableBody);
            }
            scrollToTable(tableBody);
        });
    });

    // Add functionality to View Best Lift button
    document.querySelector("#view-best-lift-button").addEventListener("click", showBestLift);
});
