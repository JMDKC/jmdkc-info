document.addEventListener('DOMContentLoaded', function () {
    const artTable = document.getElementById('art-table').getElementsByTagName('tbody')[0];
    const booksTable = document.getElementById('books-table').getElementsByTagName('tbody')[0];
    const concertsTable = document.getElementById('concerts-table').getElementsByTagName('tbody')[0];
    const compResultsTable = document.getElementById('comp-results').getElementsByTagName('tbody')[0];

    const artSeeMore = document.getElementById('art-see-more');
    const booksSeeMore = document.getElementById('books-see-more');
    const concertsSeeMore = document.getElementById('concerts-see-more');

    const limit = 10;

    // Fetch data from JSON (replace with real JSON fetching)
    const artData = [
        { "Title": "Exhibition 1", "Gallery": "Gallery 1", "Date": "2022-01-01", "Notes": "Notes 1" },
        // More art data here
    ];

    const booksData = [
        { "Title": "Book 1", "Author": "Author 1", "Date": "2022-01-01", "Notes": "Notes 1" },
        // More books data here
    ];

    const concertsData = [
        { "Title": "Concert 1", "Composer(s)": "Composer 1", "Conductor": "Conductor 1", "Cast/Soloist": "Soloist 1", "Venue": "Venue 1", "Date": "2022-01-01", "Notes": "Notes 1" },
        // More concerts data here
    ];

    const compResultsData = [
        { "Where": "Location 1", "Date": "2022-01-01", "Name": "Event 1", "Snatch": "80", "Clean & Jerk": "100", "Total": "180", "My Weight": "85", "Sinclair": "300" },
        // More competition results here
    ];

    // Function to load a limited set of rows into a table
    function loadTableData(data, table, limit) {
        table.innerHTML = '';
        const slicedData = data.slice(0, limit);
        slicedData.forEach(row => {
            const tr = document.createElement('tr');
            Object.values(row).forEach(value => {
                const td = document.createElement('td');
                td.textContent = value;
                tr.appendChild(td);
            });
            table.appendChild(tr);
        });
    }

    // Load initial data (limited to 10 rows)
    loadTableData(artData, artTable, limit);
    loadTableData(booksData, booksTable, limit);
    loadTableData(concertsData, concertsTable, limit);
    loadTableData(compResultsData, compResultsTable, limit);

    // "See More" click event for each table
    function handleSeeMoreClick(data, table, seeMoreLink) {
        let showingMore = false;
        seeMoreLink.addEventListener('click', function (e) {
            e.preventDefault();
            if (showingMore) {
                loadTableData(data, table, limit);
                seeMoreLink.textContent = 'See More';
            } else {
                loadTableData(data, table, data.length);
                seeMoreLink.textContent = 'See Less';
            }
            showingMore = !showingMore;
        });
    }

    // Attach "See More" functionality to each table
    handleSeeMoreClick(artData, artTable, artSeeMore);
    handleSeeMoreClick(booksData, booksTable, booksSeeMore);
    handleSeeMoreClick(concertsData, concertsTable, concertsSeeMore);

    // Handle Best Lift button click
    document.getElementById('view-lift-btn').addEventListener('click', function () {
        const selectedLift = document.getElementById('lift').value;
        const resultDiv = document.getElementById('result');

        // Example data (replace with actual JSON data fetching logic)
        const bestLifts = {
            "clean & jerk": "100kg",
            "snatch": "80kg",
            // More lift data here
        };

        resultDiv.textContent = `Best ${selectedLift}: ${bestLifts[selectedLift]}`;
        resultDiv.style.display = 'block';
    });

    // Handle reset click
    document.getElementById('reset').addEventListener('click', function (e) {
        e.preventDefault();
        document.getElementById('result').style.display = 'none';
    });
});
