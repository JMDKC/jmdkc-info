// Function to format date to YYYY-MM-DD
function formatDate(date) {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

// Function to limit table rows initially
function limitTableRows(tableSelector, limit) {
    const table = document.querySelector(tableSelector);
    const rows = table.querySelectorAll("tbody tr");
    rows.forEach((row, index) => {
        row.style.display = index < limit ? "" : "none";
    });
}

// Function to handle See More / See Less functionality
function addSeeMoreButton(button) {
    button.addEventListener("click", (event) => {
        event.preventDefault();
        const section = button.dataset.section;
        const table = document.querySelector(`#${section}-table tbody`);
        const rows = table.querySelectorAll("tr");

        if (button.textContent === "See More") {
            rows.forEach(row => row.style.display = "");
            button.textContent = "See Less";
        } else {
            rows.forEach((row, index) => {
                row.style.display = index < 10 ? "" : "none";
            });
            button.textContent = "See More";
            table.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

// Populate books table sorted by dateFinished
function populateBooksTable() {
    fetch("books.json")
        .then(response => response.json())
        .then(data => {
            data.sort((a, b) => new Date(b.dateFinished) - new Date(a.dateFinished));
            const booksTableBody = document.querySelector("#books-table tbody");
            booksTableBody.innerHTML = "";
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
            limitTableRows("#books-table", 10);
        })
        .catch(error => console.error("Error loading books data:", error));
}

// Populate art table sorted by date
function populateArtTable() {
    fetch("art.json")
        .then(response => response.json())
        .then(data => {
            data.sort((a, b) => new Date(b.date) - new Date(a.date));
            const artTableBody = document.querySelector("#art-table tbody");
            artTableBody.innerHTML = "";
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
            limitTableRows("#art-table", 10);
        })
        .catch(error => console.error("Error loading art data:", error));
}

// Populate concerts table sorted by date
function populateConcertsTable() {
    fetch("concerts.json")
        .then(response => response.json())
        .then(data => {
            data.sort((a, b) => new Date(b.date) - new Date(a.date));
            const concertsTableBody = document.querySelector("#concerts-table tbody");
            concertsTableBody.innerHTML = "";
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
            limitTableRows("#concerts-table", 10);
        })
        .catch(error => console.error("Error loading concerts data:", error));
}

// Populate weightlifting competition results table sorted by date
function populateWeightliftingTable() {
    fetch("comp-results.json")
        .then(response => response.json())
        .then(data => {
            data.sort((a, b) => new Date(b.date) - new Date(a.date));
            const tableBody = document.querySelector("#comp-results tbody");
            tableBody.innerHTML = "";
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
            limitTableRows("#comp-results", 10);
        })
        .catch(error => console.error("Error loading weightlifting data:", error));
}

// Initialize tables and dropdowns
document.addEventListener("DOMContentLoaded", () => {
    populateBooksTable();
    populateArtTable();
    populateConcertsTable();
    populateWeightliftingTable();

    // Add See More functionality to tables
    document.querySelectorAll(".see-more").forEach(addSeeMoreButton);
});
