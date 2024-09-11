document.addEventListener('DOMContentLoaded', () => {
    // Handle viewing the best lift
    document.getElementById('view-lift-btn').addEventListener('click', () => {
        const selectedLift = document.getElementById('lift').value;

        // Fetch the best lift data
        fetch('lifts.json')
            .then(response => response.json())
            .then(data => {
                const bestLift = data.filter(lift => lift.lift === selectedLift)
                    .reduce((max, lift) => lift.weight > max.weight ? lift : max, { weight: 0 });

                const resultDiv = document.getElementById('result');

                if (bestLift.weight > 0) {
                    resultDiv.innerHTML = `
                        <p>lift: ${bestLift.lift}</p>
                        <p>weight: ${bestLift.weight} kg</p>
                        <p>date: ${bestLift.date}</p>
                    `;
                    resultDiv.style.display = 'block'; // Show the result box
                } else {
                    resultDiv.innerHTML = '<p>No records found</p>';
                    resultDiv.style.display = 'block'; // Show the result box even for "no records"
                }
            })
            .catch(error => {
                console.error('Error fetching best lift data:', error);
                document.getElementById('result').innerHTML = '<p>Error fetching data</p>';
                resultDiv.style.display = 'block'; // Show the result box in case of error
            });
    });

    // Handle resetting the form
    document.getElementById('reset').addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default link behavior
        document.getElementById('lift').selectedIndex = 0; // Reset dropdown to the first option
        document.getElementById('result').style.display = 'none'; // Hide the result box
    });

    // Function to fetch and populate the Art, Books, and Concerts tables
    function populateTable(tableId, data, columns) {
        const tableBody = document.getElementById(tableId).getElementsByTagName('tbody')[0];
        const maxRowsToShow = 5; // Maximum number of rows to show initially
        const seeMoreLink = document.createElement('a');
        seeMoreLink.href = '#';
        seeMoreLink.innerText = 'See More';
        seeMoreLink.classList.add('see-more-link');
        
        const seeLessLink = document.createElement('a');
        seeLessLink.href = '#';
        seeLessLink.innerText = 'See Less';
        seeLessLink.classList.add('see-less-link');
        seeLessLink.style.display = 'none'; // Initially hidden

        let showingAllRows = false;

        // Insert rows into the table
        function renderTableRows(showAll = false) {
            tableBody.innerHTML = ''; // Clear current table content
            const rowsToShow = showAll ? data.length : Math.min(data.length, maxRowsToShow);

            for (let i = 0; i < rowsToShow; i++) {
                const item = data[i];
                const row1 = tableBody.insertRow();
                columns.forEach(col => {
                    const cell = row1.insertCell();
                    cell.innerText = item[col] || 'N/A'; // Fallback to 'N/A' if data is missing
                });
                const row2 = tableBody.insertRow();
                const cell = row2.insertCell();
                cell.colSpan = columns.length; // Span across all columns for the "Notes"
                cell.innerText = item.Notes || ''; // Add the notes here
                cell.classList.add('notes-cell'); // Class for visual differentiation
            }

            if (showAll && data.length > maxRowsToShow) {
                tableBody.appendChild(seeLessLink);
            } else if (!showAll && data.length > maxRowsToShow) {
                tableBody.appendChild(seeMoreLink);
            }
        }

        renderTableRows(false); // Show initial rows

        // Add event listeners for "See More" and "See Less"
        seeMoreLink.addEventListener('click', (e) => {
            e.preventDefault();
            showingAllRows = true;
            renderTableRows(true);
            seeMoreLink.style.display = 'none'; // Hide "See More" link
            seeLessLink.style.display = 'block'; // Show "See Less" link
        });

        seeLessLink.addEventListener('click', (e) => {
            e.preventDefault();
            showingAllRows = false;
            renderTableRows(false);
            seeMoreLink.style.display = 'block'; // Show "See More" link
            seeLessLink.style.display = 'none'; // Hide "See Less" link
        });
    }

    // Fetch data for Art, Books, and Concerts
    fetch('art.json')
        .then(response => response.json())
        .then(data => {
            populateTable('art-table', data, ['Title', 'Gallery', 'Date']);
        })
        .catch(error => console.error('Error fetching art data:', error));

    fetch('books.json')
        .then(response => response.json())
        .then(data => {
            populateTable('books-table', data, ['Title', 'Author', 'Date']);
        })
        .catch(error => console.error('Error fetching books data:', error));

    fetch('concerts.json')
        .then(response => response.json())
        .then(data => {
            populateTable('concerts-table', data, ['Title', 'Composer(s)', 'Conductor', 'Cast/Soloist', 'Venue', 'Date']);
        })
        .catch(error => console.error('Error fetching concerts data:', error));

    // Fetch data for Competition Results
    fetch('comp-results.json')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('comp-results').getElementsByTagName('tbody')[0];
            data.forEach(record => {
                const row = tableBody.insertRow();
                row.insertCell(0).innerText = record.Where;
                row.insertCell(1).innerText = record.Date;
                row.insertCell(2).innerText = record.Name;
                row.insertCell(3).innerText = record.Snatch;
                row.insertCell(4).innerText = record['Clean & Jerk'];
                row.insertCell(5).innerText = record.Total;
                row.insertCell(6).innerText = record['My Weight'];
                row.insertCell(7).innerText = record.Sinclair;
            });
        })
        .catch(error => console.error('Error fetching competition results:', error));
});
