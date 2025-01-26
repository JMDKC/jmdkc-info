// Populate books table
function populateBooksTable() {
    fetch("books.json")
        .then(response => response.json())
        .then(data => {
            data.sort((a, b) => new Date(b.dateFinished) - new Date(a.dateFinished));
            const booksTableBody = document.querySelector("#books-table tbody");
            booksTableBody.innerHTML = "";
            data.forEach((book, index) => {
                const row = `
                    <tr class="${index >= 10 ? 'hidden' : ''}">
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
            data.sort((a, b) => new Date(b.date) - new Date(a.date));
            const artTableBody = document.querySelector("#art-table tbody");
            artTableBody.innerHTML = "";
            data.forEach((art, index) => {
                const row = `
                    <tr class="${index >= 10 ? 'hidden' : ''}">
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
            data.sort((a, b) => new Date(b.date) - new Date(a.date));
            const concertsTableBody = document.querySelector("#concerts-table tbody");
            concertsTableBody.innerHTML = "";
            data.forEach((concert, index) => {
                const row = `
                    <tr class="${index >= 10 ? 'hidden' : ''}">
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
            data.sort((a, b) => new Date(b.date) - new Date(a.date));
            const tableBody = document.querySelector("#comp-results tbody");
            tableBody.innerHTML = "";
            data.forEach((result, index) => {
                const row = `
                    <tr class="${index >= 10 ? 'hidden' : ''}">
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

// See More functionality
function addSeeMoreButton(button) {
    button.addEventListener("click", (event) => {
        event.preventDefault();
        const section = button.dataset.section;
        const tableRows = document.querySelectorAll(`#${section}-table tbody tr`);
        tableRows.forEach((row, index) => {
            if (index >= 10) row.classList.toggle("hidden");
        });

        if (button.textContent === "See More") {
            button.textContent = "See Less";
            button.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
            button.textContent = "See More";
            tableRows[0].scrollIntoView({ behavior: "smooth", block: "start" });
        }
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

    document.querySelectorAll(".see-more").forEach(addSeeMoreButton);
});
