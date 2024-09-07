function populateTable(tableId, data, columns) {
    const tableBody = document.getElementById(tableId).getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear previous content

    const initialRows = data.slice(0, 10); // Show only the first 10 rows initially
    addRowsToTable(tableBody, initialRows, columns);

    // Add the "See More" link if there are more than 10 rows
    if (data.length > 10) {
        const seeMoreRow = tableBody.insertRow();
        const seeMoreCell = seeMoreRow.insertCell(0);
        seeMoreCell.colSpan = columns.length;
        seeMoreCell.innerHTML = `<a href="#" class="see-more-link">See More</a>`;
        seeMoreCell.className = "see-more-cell";

        seeMoreCell.querySelector('a').addEventListener('click', (event) => {
            event.preventDefault();
            displayAllRows(tableId, data, columns);
        });
    }
}

function displayAllRows(tableId, data, columns) {
    const tableBody = document.getElementById(tableId).getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear previous content

    // Add all rows
    addRowsToTable(tableBody, data, columns);

    // Add the "See Less" link to shrink the table
    const seeLessRow = tableBody.insertRow();
    const seeLessCell = seeLessRow.insertCell(0);
    seeLessCell.colSpan = columns.length;
    seeLessCell.innerHTML = `<a href="#" class="see-less-link">See Less</a>`;
    seeLessCell.className = "see-less-cell";

    seeLessCell.querySelector('a').addEventListener('click', (event) => {
        event.preventDefault();
        populateTable(tableId, data, columns); // Shrink back to initial rows
    });
}

function addRowsToTable(tableBody, data, columns) {
    data.forEach(record => {
        const row = tableBody.insertRow();
        columns.forEach(col => {
            row.insertCell().innerText = record[col] || '';
        });

        if (record.Notes) {
            const notesRow = tableBody.insertRow();
            const notesCell = notesRow.insertCell(0);
            notesCell.colSpan = columns.length;
            notesCell.innerText = record.Notes;
            notesCell.className = "notes-cell";
        }
    });
}

// Fetch and display Art data
fetch('art.json')
    .then(response => response.json())
    .then(data => {
        populateTable('art-table', data, ['Title', 'Gallery', 'Date']);
    })
    .catch(error => {
        console.error('Error fetching art data:', error);
    });

// Fetch and display Books data
fetch('books.json')
    .then(response => response.json())
    .then(data => {
        populateTable('books-table', data, ['Title', 'Author', 'Date']);
    })
    .catch(error => {
        console.error('Error fetching books data:', error);
    });

// Fetch and display Concerts & Opera data
fetch('concerts.json')
    .then(response => response.json())
    .then(data => {
        populateTable('concerts-table', data, ['Title', 'Composer(s)', 'Conductor', 'Cast/Soloist', 'Venue', 'Date']);
    })
    .catch(error => {
        console.error('Error fetching concerts data:', error);
    });

// Fetch and display Weightlifting competition results data
fetch('comp-results.json')
    .then(response => response.json())
    .then(data => {
        populateTable('comp-results', data, ['Where', 'Date', 'Name', 'Snatch', 'Clean & Jerk', 'Total', 'My Weight', 'Sinclair']);
    })
    .catch(error => {
        console.error('Error fetching competition results:', error);
    });
