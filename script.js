// Example data structures for books, art, and concerts
const booksData = [
    { title: "Book Title 1", author: "Author 1", dateStarted: "2024-01-01", dateFinished: "2024-01-15" },
    { title: "Book Title 2", author: "Author 2", dateStarted: "2024-02-01", dateFinished: "2024-02-20" },
    { title: "Book Title 3", author: "Author 3", dateStarted: "2024-03-01", dateFinished: "2024-03-15" }
];

const artData = [
    { title: "Art Exhibition 1", gallery: "Gallery A", date: "2024-03-01" },
    { title: "Art Exhibition 2", gallery: "Gallery B", date: "2024-03-15" },
    { title: "Art Exhibition 3", gallery: "Gallery C", date: "2024-04-01" }
];

const concertsData = [
    {
        title: "Concert 1",
        composers: "Composer A, Composer B",
        conductor: "Conductor A",
        cast: "Soloist A, Soloist B",
        venue: "Venue A",
        date: "2024-05-01"
    },
    {
        title: "Concert 2",
        composers: "Composer C",
        conductor: "Conductor B",
        cast: "Soloist C",
        venue: "Venue B",
        date: "2024-05-15"
    }
];

// Populate books table
function populateBooksTable() {
    const booksTableBody = document.querySelector("#books-table tbody");
    booksData.forEach((book) => {
        const row = `
            <tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.dateStarted}</td>
                <td>${book.dateFinished}</td>
            </tr>
        `;
        booksTableBody.innerHTML += row;
    });
}

// Populate art table
function populateArtTable() {
    const artTableBody = document.querySelector("#art-table tbody");
    artData.forEach((art) => {
        const row = `
            <tr>
                <td>${art.title}</td>
                <td>${art.gallery}</td>
                <td>${art.date}</td>
            </tr>
        `;
        artTableBody.innerHTML += row;
    });
}

// Populate concerts table
function populateConcertsTable() {
    const concertsTableBody = document.querySelector("#concerts-table tbody");
    concertsData.forEach((concert) => {
        const row = `
            <tr>
                <td>${concert.title}</td>
                <td>${concert.composers}</td>
                <td>${concert.conductor}</td>
                <td>${concert.cast}</td>
                <td>${concert.venue}</td>
                <td>${concert.date}</td>
            </tr>
        `;
        concertsTableBody.innerHTML += row;
    });
}

// See More functionality
document.querySelectorAll(".see-more").forEach((button) => {
    button.addEventListener("click", (event) => {
        event.preventDefault();
        const section = event.target.dataset.section;
        const table = document.querySelector(`#${section}-table`);
        table.classList.toggle("expanded");

        if (table.classList.contains("expanded")) {
            button.textContent = "See Less";
        } else {
            button.textContent = "See More";
        }
    });
});

// Initialize tables
document.addEventListener("DOMContentLoaded", () => {
    populateBooksTable();
    populateArtTable();
    populateConcertsTable();
});
