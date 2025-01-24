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
            limitTableRows("books");
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
            limitTableRows("art");
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
            limitTableRows("concerts");
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
            limitTableRows("comp-results");
        })
        .catch(error => console.error("Error loading weightlifting data:", error));
}

// See More functionality
function addSeeMoreButton(button) {
    button.addEventListener("click", (event) => {
        event.preventDefault();
        const section = button.dataset.section;
        const table = document.querySelector(`#${section}-table tbody`);
        const rows = table.querySelectorAll("tr");
        const isExpanded = table.classList.contains("expanded");

        if (!isExpanded) {
            rows.forEach(row => row.style.display = "table-row");
            button.textContent = "See Less";
            table.classList.add("expanded");
            table.scrollIntoView({ behavior: "smooth" });
        } else {
            rows.forEach((row, index) => {
                row.style.display = index < 10 ? "table-row" : "none";
            });
            button.textContent = "See More";
            table.classList.remove("expanded");
            table.scrollIntoView({ behavior: "smooth" });
        }
    });
}

// Limit table rows to show only 10 initially
function limitTableRows(section) {
    const table = document.querySelector(`#${section}-table tbody`);
    if (table) {
        const rows = table.querySelectorAll("tr");
        rows.forEach((row, index) => {
            row.style.display = index < 10 ? "table-row" : "none";
        });
    }
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

    // Add See More functionality and limit table rows
    document.querySelectorAll(".see-more").forEach(button => {
        const section = button.dataset.section;
        limitTableRows(section);
        addSeeMoreButton(button);
    });
});
