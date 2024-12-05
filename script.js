// Example data structures for books, art, concerts, and weightlifting results
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

const weightliftingData = [
    {
        where: "Competition 1",
        date: "2024-06-01",
        name: "John Doe",
        snatch: "100kg",
        cleanAndJerk: "120kg",
        total: "220kg",
        myWeight: "75kg",
        sinclair: "250.5"
    },
    {
        where: "Competition 2",
        date: "2024-06-15",
        name: "Jane Smith",
        snatch: "90kg",
        cleanAndJerk: "110kg",
        total: "200kg",
        myWeight: "70kg",
        sinclair: "240.3"
    }
];

// Populate books table from books.json
function populateBooksTable() {
    fetch("books.json")
        .then(response => {
            if (!response.ok) throw new Error("Failed to fetch books data");
            return response.json();
        })
        .then(data => {
            const booksTableBody = document.querySelector("#books-table tbody");
            booksTableBody.innerHTML = ""; // Clear placeholder text
            data.forEach(book => {
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
        })
        .catch(error => {
            console.error("Error loading books data:", error);
        });
}

// Populate art table from art.json
function populateArtTable() {
    fetch("art.json")
        .then(response => {
            if (!response.ok) throw new Error("Failed to fetch art data");
            return response.json();
        })
        .then(data => {
            const artTableBody = document.querySelector("#art-table tbody");
            artTableBody.innerHTML = ""; // Clear placeholder text
            data.forEach(art => {
                const row = `
                    <tr>
                        <td>${art.title}</td>
                        <td>${art.gallery}</td>
                        <td>${art.date}</td>
                    </tr>
                `;
                artTableBody.innerHTML += row;
            });
        })
        .catch(error => {
            console.error("Error loading art data:", error);
        });
}

// Populate concerts table from concerts.json
function populateConcertsTable() {
    fetch("concerts.json")
        .then(response => {
            if (!response.ok) throw new Error("Failed to fetch concerts data");
            return response.json();
        })
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
                        <td>${concert.date}</td>
                    </tr>
                `;
                concertsTableBody.innerHTML += row;
            });
        })
        .catch(error => {
            console.error("Error loading concerts data:", error);
        });
}

// Populate weightlifting results table
function populateWeightliftingTable() {
    fetch("comp-results.json")
        .then(response => {
            if (!response.ok) throw new Error("Failed to fetch JSON");
            return response.json();
        })
        .then(data => {
            const tableBody = document.querySelector("#comp-results tbody");
            tableBody.innerHTML = ""; // Clear placeholder text
            data.forEach(result => {
                const row = `
                    <tr>
                        <td>${result.where}</td>
                        <td>${result.date}</td>
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
        .catch(error => {
            console.error("Error loading weightlifting data:", error);
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
    populateWeightliftingTable(); // Initialize weightlifting data
});
