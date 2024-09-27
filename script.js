document.addEventListener('DOMContentLoaded', function () {
    const artTable = document.getElementById('art-table').getElementsByTagName('tbody')[0];
    const booksTable = document.getElementById('books-table').getElementsByTagName('tbody')[0];
    const concertsTable = document.getElementById('concerts-table').getElementsByTagName('tbody')[0];

    const artSeeMore = document.getElementById('art-see-more');
    const booksSeeMore = document.getElementById('books-see-more');
    const concertsSeeMore = document.getElementById('concerts-see-more');

    let artExpanded = false;
    let booksExpanded = false;
    let concertsExpanded = false;

    // Function to show or hide additional rows
    function toggleRows(table, rows, expanded) {
        for (let i = 10; i < rows.length; i++) {
            rows[i].style.display = expanded ? 'none' : 'table-row';
        }
    }

    // Initial setup: hide rows beyond the first 10
    function initializeTable(table) {
        const rows = table.getElementsByTagName('tr');
        if (rows.length > 10) {
            toggleRows(table, rows, true); // Hide additional rows
        }
    }

    // Initialize all tables
    initializeTable(artTable);
    initializeTable(booksTable);
    initializeTable(concertsTable);

    // Handle the "See More" for Art
    artSeeMore.addEventListener('click', function (e) {
        e.preventDefault();
        artExpanded = !artExpanded;
        toggleRows(artTable, artTable.getElementsByTagName('tr'), !artExpanded);
        artSeeMore.textContent = artExpanded ? 'See Less' : 'See More';
    });

    // Handle the "See More" for Books
    booksSeeMore.addEventListener('click', function (e) {
        e.preventDefault();
        booksExpanded = !booksExpanded;
        toggleRows(booksTable, booksTable.getElementsByTagName('tr'), !booksExpanded);
        booksSeeMore.textContent = booksExpanded ? 'See Less' : 'See More';
    });

    // Handle the "See More" for Concerts
    concertsSeeMore.addEventListener('click', function (e) {
        e.preventDefault();
        concertsExpanded = !concertsExpanded;
        toggleRows(concertsTable, concertsTable.getElementsByTagName('tr'), !concertsExpanded);
        concertsSeeMore.textContent = concertsExpanded ? 'See Less' : 'See More';
    });

    // Weightlifting section - dynamic fetching of best lifts
    const viewLiftBtn = document.getElementById('view-lift-btn');
    const resetLink = document.getElementById('reset');
    const liftSelect = document.getElementById('lift');
    const resultDiv = document.getElementById('result');

    let bestLifts = {}; // Empty object to hold best lifts data

    // Fetch best lifts from JSON file
    fetch('best_lifts.json')
        .then(response => response.json())
        .then(data => {
            bestLifts = data.lifts.reduce((acc, lift) => {
                acc[lift.name] = lift.best;
                return acc;
            }, {});
        })
        .catch(error => console.error('Error fetching best lifts:', error));

    // Show best lift result when button is clicked
    viewLiftBtn.addEventListener('click', function () {
        const selectedLift = liftSelect.value.toLowerCase();
        if (bestLifts[selectedLift]) {
            resultDiv.textContent = `Your best ${selectedLift} is ${bestLifts[selectedLift]}.`;
            resultDiv.style.display = 'block';
        } else {
            resultDiv.textContent = 'No data available for this lift.';
            resultDiv.style.display = 'block';
        }
    });

    // Reset the result and hide the result box
    resetLink.addEventListener('click', function (e) {
        e.preventDefault();
        resultDiv.style.display = 'none';
        liftSelect.selectedIndex = 0;
    });
});
