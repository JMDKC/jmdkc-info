document.addEventListener('DOMContentLoaded', () => {
    // Handling "View Best Lift" button
    document.getElementById('view-lift-btn').addEventListener('click', () => {
        const selectedLift = document.getElementById('lift').value;
        fetch('lifts.json')
            .then(response => response.json())
            .then(data => {
                const bestLift = data.filter(lift => lift.lift === selectedLift)
                    .reduce((max, lift) => lift.weight > max.weight ? lift : max, {weight: 0});

                if (bestLift.weight > 0) {
                    document.getElementById('result').style.display = 'block';
                    document.getElementById('result').innerHTML = `
                        <p>Lift: ${bestLift.lift}</p>
                        <p>Weight: ${bestLift.weight} kg</p>
                        <p>Date: ${bestLift.date}</p>
                    `;
                } else {
                    document.getElementById('result').style.display = 'block';
                    document.getElementById('result').innerHTML = '<p>No records found</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching best lift data:', error);
                document.getElementById('result').style.display = 'block';
                document.getElementById('result').innerHTML = '<p>Error fetching data</p>';
            });
    });

    // Reset functionality
    document.getElementById('reset').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('lift').selectedIndex = 0;
        document.getElementById('result').style.display = 'none';
    });

    // Fetch and display competition results
    fetch('comp-results.json')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('comp-results').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = ''; // Clear previous content

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
        .catch(error => {
            console.error('Error fetching competition results:', error);
        });

    // Fetch and display Art data
    fetch('art.json')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('art-table').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = ''; // Clear previous content

            data.forEach(record => {
                const row = tableBody.insertRow();
                row.insertCell(0).innerText = record.Title;
                row.insertCell(1).innerText = record.Gallery;
                row.insertCell(2).innerText = record.Date;

                const notesRow = tableBody.insertRow();
                const notesCell = notesRow.insertCell(0);
                notesCell.colSpan = 3;
                notesCell.innerText = record.Notes;
                notesCell.className = "notes-cell";
            });
        })
        .catch(error => {
            console.error('Error fetching art data:', error);
        });

    // Fetch and display Books data
    fetch('books.json')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('books-table').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = ''; // Clear previous content

            data.forEach(record => {
                const row = tableBody.insertRow();
                row.insertCell(0).innerText = record.Title;
                row.insertCell(1).innerText = record.Author;
                row.insertCell(2).innerText = record.Date;

                const notesRow = tableBody.insertRow();
                const notesCell = notesRow.insertCell(0);
                notesCell.colSpan = 3;
                notesCell.innerText = record.Notes;
                notesCell.className = "notes-cell";
            });
        })
        .catch(error => {
            console.error('Error fetching books data:', error);
        });

    // Fetch and display Concerts & Opera data
    fetch('concerts.json')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('concerts-table').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = ''; // Clear previous content

            data.forEach(record => {
                const row = tableBody.insertRow();
                row.insertCell(0).innerText = record.Title;
                row.insertCell(1).innerText = record['Composer(s)'] || ''; // Handle undefined
                row.insertCell(2).innerText = record.Conductor || ''; // Handle undefined
                row.insertCell(3).innerText = record['Cast/Soloist'] || ''; // Handle undefined
                row.insertCell(4).innerText = record.Venue;
                row.insertCell(5).innerText = record.Date;

                const notesRow = tableBody.insertRow();
                const notesCell = notesRow.insertCell(0);
                notesCell.colSpan = 6;
                notesCell.innerText = record.Notes;
                notesCell.className = "notes-cell";
            });
        })
        .catch(error => {
            console.error('Error fetching concerts data:', error);
        });
});
