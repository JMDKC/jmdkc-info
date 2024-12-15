// Function to format dates as yyyy-mm-dd
function formatDate(dateString) {
    const date = new Date(dateString);
    if (isNaN(date)) return dateString; // Return original string if it's not a valid date
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Function to handle "See More" functionality
function addSeeMoreButton(tableSelector, data, populateFunction) {
    const table = document.querySelector(tableSelector);
    const tableBody = table.querySelector("tbody");
    const seeMoreButton = document.querySelector(`[data-section="${tableSelector.replace('#', '').replace('-table', '')}"]`);

    let showingAll = false;
    const defaultRows = 10;

    // Function to update the table with a limited or full dataset
    function updateTable(limit) {
        tableBody.innerHTML = ""; // Clear table
        data.slice(0, limit).forEach(populateFunction);
    }

    // Initial population of the table with limited rows
    updateTable(defaultRows);

    // Event listener for the "See More" button
    seeMoreButton.addEventListener("click", (event) => {
        event.preventDefault();
        showingAll = !showingAll;
        if (showingAll) {
            updateTable(data.length); // Show all rows
            seeMoreButton.textContent = "See Less";
        } else {
            updateTable(defaultRows); // Show default rows
            seeMoreButton.textContent = "See More";
        }
    });
}

// Populate books table
function populateBooksTableRow(book) {
    const booksTableBody = document.querySelector("#books-table tbody");
    const row = `
        <tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${formatDate(book.dateStarted)}</td>
            <td>${formatDate(book.dateFinished)}</td>
        </tr>
    `;
    booksTableBody.innerHTML += row;
}

function loadBooksTable() {
    fetch("books.json")
        .then(response => {
            if (!response.ok) throw new Error("Failed to fetch books data");
            return response.json();
        })
        .then(data => {
            addSeeMoreButton("#books-table", data, populateBooksTableRow);
        })
        .catch(error => {
            console.error("Error loading books data:", error);
        });
}

// Populate art table
function populateArtTableRow(art) {
    const artTableBody = document.querySelector("#art-table tbody");
    const row = `
        <tr>
            <td>${art.title}</td>
            <td>${art.gallery}</td>
            <td>${formatDate(art.date)}</td>
        </tr>
    `;
    artTableBody.innerHTML += row;
}

function loadArtTable() {
    fetch("art.json")
        .then(response => {
            if (!response.ok) throw new Error("Failed to fetch art data");
            return response.json();
        })
        .then(data => {
            addSeeMoreButton("#art-table", data, populateArtTableRow);
        })
        .catch(error => {
            console.error("Error loading art data:", error);
        });
}

// Populate concerts table
function populateConcertsTableRow(concert) {
    const concertsTableBody = document.querySelector("#concerts-table tbody");
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
}

function loadConcertsTable() {
    fetch("concerts.json")
        .then(response => {
            if (!response.ok) throw new Error("Failed to fetch concerts data");
            return response.json();
        })
        .then(data => {
            addSeeMoreButton("#concerts-table", data, populateConcertsTableRow);
        })
        .catch(error => {
            console.error("Error loading concerts data:", error);
        });
}

// Populate weightlifting results table
function populateWeightliftingTableRow(result) {
    const tableBody = document.querySelector("#comp-results tbody");
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
}

function loadWeightliftingTable() {
    fetch("comp-results.json")
        .then(response => {
            if (!response.ok) throw new Error("Failed to fetch JSON");
            return response.json();
        })
        .then(data => {
            addSeeMoreButton("#comp-results", data, populateWeightliftingTableRow);
        })
        .catch(error => {
            console.error("Error loading weightlifting data:", error);
        });
}

// Initialize tables
document.addEventListener("DOMContentLoaded", () => {
    loadBooksTable();
    loadArtTable();
    loadConcertsTable();
    loadWeightliftingTable();
});

// Load the lifts data and populate the dropdown
function loadLiftsDropdown() {
    fetch("lifts.json")
        .then(response => {
            if (!response.ok) throw new Error("Failed to fetch lifts data");
            return response.json();
        })
        .then(data => {
            const dropdown = document.querySelector("#choose-lift-dropdown");
            const uniqueLifts = [...new Set(data.map(lift => lift.lift))]; // Extract unique lift names

            // Populate dropdown
            dropdown.innerHTML = ""; // Clear any existing options
            uniqueLifts.forEach(lift => {
                const option = document.createElement("option");
                option.value = lift;
                option.textContent = lift;
                dropdown.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error loading lifts data:", error);
        });
}

// Find and display the best lift for the selected lift type
function viewBestLift() {
    const selectedLift = document.querySelector("#choose-lift-dropdown").value;
    const bestLiftContainer = document.querySelector("#best-lift-container");

    fetch("lifts.json")
        .then(response => {
            if (!response.ok) throw new Error("Failed to fetch lifts data");
            return response.json();
        })
        .then(data => {
            // Filter lifts for the selected type and find the heaviest weight
            const liftsOfSelectedType = data.filter(lift => lift.lift === selectedLift);
            if (liftsOfSelectedType.length === 0) {
                bestLiftContainer.innerHTML = "No lifts recorded for this type.";
                return;
            }

            const bestLift = liftsOfSelectedType.reduce((max, lift) => {
                return lift.weight > max.weight ? lift : max;
            }, liftsOfSelectedType[0]);

            // Display the best lift in the required format
            bestLiftContainer.innerHTML = `
                ${bestLift.weight}kg (${bestLift.date}) 
                <a href="#" id="reset-link" class="reset-link">(reset)</a>
            `;

            // Add reset functionality
            document.querySelector("#reset-link").addEventListener("click", (event) => {
                event.preventDefault();
                bestLiftContainer.innerHTML = ""; // Clear the result
            });
        })
        .catch(error => {
            console.error("Error finding best lift:", error);
        });
}

// Add event listener to the "View Best Lift" button
document.querySelector("#view-best-lift-button").addEventListener("click", (event) => {
    event.preventDefault();
    viewBestLift();
});

// Initialize dropdown on page load
document.addEventListener("DOMContentLoaded", () => {
    loadLiftsDropdown();
});
