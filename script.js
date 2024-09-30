document.addEventListener('DOMContentLoaded', function () {
    const artTable = document.getElementById('art-table').getElementsByTagName('tbody')[0];
    const booksTable = document.getElementById('books-table').getElementsByTagName('tbody')[0];
    const concertsTable = document.getElementById('concerts-table').getElementsByTagName('tbody')[0];
    const compResultsTable = document.getElementById('comp-results').getElementsByTagName('tbody')[0];

    const artSeeMore = document.getElementById('art-see-more');
    const booksSeeMore = document.getElementById('books-see-more');
    const concertsSeeMore = document.getElementById('concerts-see-more');

    const limit = 10;

    // Function to load a limited set of rows into a table with notes on a new row
    function loadTableData(data, table, limit) {
        table.innerHTML = '';
        const slicedData = data.slice(0, limit);
        slicedData.forEach(row => {
            // Main row for title, gallery, date, etc.
            const mainRow = document.createElement('tr');
            for (let key in row) {
                if (key !== 'Notes') {
                    const td = document.createElement('td');
                    td.textContent = row[key];
                    mainRow.appendChild(td);
                }
            }
            table.appendChild(mainRow);

            // Second row for notes spanning all columns
            if (row['Notes']) {
                const notesRow = document.createElement('tr');
                const notesTd = document.createElement('td');
                notesTd.setAttribute('colspan', Object.keys(row).length - 1); // Spans all columns except 'Notes'
                notesTd.textContent = row['Notes'];
                notesRow.appendChild(notesTd);
                table.appendChild(notesRow);
            }
        });
    }

    // Function to load full table data
    function loadFullTableData(data, table) {
        table.innerHTML = '';
        data.forEach(row => {
            // Main row for title, gallery, date, etc.
            const mainRow = document.createElement('tr');
            for (let key in row) {
                if (key !== 'Notes') {
                    const td = document.createElement('td');
                    td.textContent = row[key];
                    mainRow.appendChild(td);
                }
            }
            table.appendChild(mainRow);

            // Second row for notes spanning all columns
            if (row['Notes']) {
                const notesRow = document.createElement('tr');
                const notesTd = document.createElement('td');
                notesTd.setAttribute('colspan', Object.keys(row).length - 1); // Spans all columns except 'Notes'
                notesTd.textContent = row['Notes'];
                notesRow.appendChild(notesTd);
                table.appendChild(notesRow);
            }
        });
    }

    // Fetch and load JSON data for each table
    function fetchAndLoadTable(jsonUrl, table, seeMoreLink) {
        fetch(jsonUrl)
            .then(response => response.json())
            .then(data => {
                loadTableData(data, table, limit); // Load initial limited data

                let showingMore = false;
                seeMoreLink.addEventListener('click', function (e) {
                    e.preventDefault();
                    if (showingMore) {
                        loadTableData(data, table, limit); // Show limited rows again
                        seeMoreLink.textContent = 'See More';
                    } else {
                        loadFullTableData(data, table); // Show full table
                        seeMoreLink.textContent = 'See Less';
                    }
                    showingMore = !showingMore;
                });
            })
            .catch(error => console.error('Error fetching table data:', error));
    }

    // Attach JSON data sources and set up table loading
    fetchAndLoadTable('art.json', artTable, artSeeMore);
    fetchAndLoadTable('books.json', booksTable, booksSeeMore);
    fetchAndLoadTable('concerts.json', concertsTable, concertsSeeMore);
    fetchAndLoadTable('competitions.json', compResultsTable, null); // No 'See More' for competition results

    // Handle Best Lift button click
    document.getElementById('view-lift-btn').addEventListener('click', function () {
        const selectedLift = document.getElementById('lift').value;
        const resultDiv = document.getElementById('result');

        fetch('bestLifts.json')
            .then(response => response.json())
            .then(bestLifts => {
                resultDiv.textContent = `Best ${selectedLift}: ${bestLifts[selectedLift] || 'No data available'}`;
                resultDiv.style.display = 'block';
            })
            .catch(error => console.error('Error fetching best lifts data:', error));
    });

    // Handle reset click
    document.getElementById('reset').addEventListener('click', function (e) {
        e.preventDefault();
        document.getElementById('result').style.display = 'none';
    });
});
