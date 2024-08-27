document.addEventListener('DOMContentLoaded', () => {

    function populateTable(url, tableId, columns) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const tableBody = document.getElementById(tableId).querySelector('tbody');
                tableBody.innerHTML = ''; // Clear previous content

                if (data.length === 0) {
                    tableBody.innerHTML = '<tr><td colspan="' + columns.length + '">No data available</td></tr>';
                    return;
                }

                data.forEach(record => {
                    const row = tableBody.insertRow();
                    columns.forEach(column => {
                        const cell = row.insertCell();
                        cell.innerText = record[column] || '';  // Fill the cell with data or empty string if undefined
                    });
                });
            })
            .catch(error => {
                console.error(`Error fetching data for ${tableId}:`, error);
            });
    }

    // Populate the tables with data
    populateTable('art.json', 'art-table', ['Title', 'Gallery', 'Date', 'Notes']);
    populateTable('books.json', 'books-table', ['Title', 'Author', 'Date', 'Notes']);
    populateTable('concerts.json', 'concerts-table', ['Title', 'Composer(s)', 'Conductor', 'Cast/Soloist', 'Venue', 'Date', 'Notes']);
    populateTable('comp-results.json', 'comp-results', ['Where', 'Date', 'Name', 'Snatch', 'Clean & Jerk', 'Total', 'My Weight', 'Sinclair']);

    // Fetch and populate the Art table
    fetch('art.json')
        .then(response => response.json())
        .then(data => {
            const artTableBody = document.getElementById('art-table').getElementsByTagName('tbody')[0];
            artTableBody.innerHTML = ''; // Clear any existing rows

            data.forEach(art => {
                // First row for title, gallery, date
                const detailsRow = artTableBody.insertRow();
                detailsRow.className = 'details-row';
                detailsRow.insertCell(0).innerText = art.Title;
                detailsRow.insertCell(1).innerText = art.Gallery;
                detailsRow.insertCell(2).innerText = art.Date;

                // Second row for notes
                const notesRow = artTableBody.insertRow();
                notesRow.className = 'notes-row';
                const notesCell = notesRow.insertCell(0);
                notesCell.colSpan = 3; // Span across all columns
                notesCell.innerText = art.Notes;
            });
        })
        .catch(error => {
            console.error('Error fetching Art data:', error);
        });

    // Event listener for the best lift section
    const viewLiftBtn = document.getElementById('view-lift-btn');
    const resetBtn = document.getElementById('reset');

    if (viewLiftBtn) {
        viewLiftBtn.addEventListener('click', () => {
            fetch('lifts.json')
                .then(response => response.json())
                .then(data => {
                    const selectedLift = document.getElementById('lift').value;
                    const bestLift = data.filter(lift => lift.lift === selectedLift)
                        .reduce((max, lift) => lift.weight > max.weight ? lift : max, {weight: 0});

                    const resultDiv = document.getElementById('result');
                    if (bestLift.weight > 0) {
                        resultDiv.innerHTML = `
                            <p>lift: ${bestLift.lift}</p>
                            <p>weight: ${bestLift.weight} kg</p>
                            <p>date: ${bestLift.date}</p>
                        `;
                        resultDiv.style.display = 'block';
                    } else {
                        resultDiv.innerHTML = '<p>No records found</p>';
                        resultDiv.style.display = 'block';
                    }
                })
                .catch(error => {
                    console.error('Error fetching best lift data:', error);
                    document.getElementById('result').innerHTML = '<p>Error fetching data</p>';
                });
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            const liftSelect = document.getElementById('lift');
            if (liftSelect) liftSelect.selectedIndex = 0;
            document.getElementById('result').innerHTML = '';  // Clear the result box
            document.getElementById('result').style.display = 'none';
        });
    }
});
