document.addEventListener('DOMContentLoaded', () => {
    // Fetch and populate the Competition Results table
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

    // Fetch and populate the Books table with two-row structure
    fetch('books.json')
        .then(response => response.json())
        .then(data => {
            const booksTableBody = document.getElementById('books-table').getElementsByTagName('tbody')[0];
            booksTableBody.innerHTML = ''; // Clear any existing rows

            data.forEach(book => {
                // First row for title, author, date
                const detailsRow = booksTableBody.insertRow();
                detailsRow.className = 'details-row';
                detailsRow.insertCell(0).innerText = book.Title;
                detailsRow.insertCell(1).innerText = book.Author;
                detailsRow.insertCell(2).innerText = book.Date;

                // Second row for notes
                const notesRow = booksTableBody.insertRow();
                notesRow.className = 'notes-row';
                const notesCell = notesRow.insertCell(0);
                notesCell.colSpan = 3; // Span across all columns
                notesCell.innerText = book.Notes;
            });
        })
        .catch(error => {
            console.error('Error fetching books data:', error);
        });

    // Fetch and populate the Concerts & Opera table with two-row structure
    fetch('concerts.json')
        .then(response => response.json())
        .then(data => {
            const concertsTableBody = document.getElementById('concerts-table').getElementsByTagName('tbody')[0];
            concertsTableBody.innerHTML = ''; // Clear any existing rows

            data.forEach(concert => {
                // First row for title, composer(s), conductor, cast/soloist, venue, date
                const detailsRow = concertsTableBody.insertRow();
                detailsRow.className = 'details-row';
                detailsRow.insertCell(0).innerText = concert.Title;
                detailsRow.insertCell(1).innerText = concert.Composer;
                detailsRow.insertCell(2).innerText = concert.Conductor;
                detailsRow.insertCell(3).innerText = concert.Cast;
                detailsRow.insertCell(4).innerText = concert.Venue;
                detailsRow.insertCell(5).innerText = concert.Date;

                // Second row for notes
                const notesRow = concertsTableBody.insertRow();
                notesRow.className = 'notes-row';
                const notesCell = notesRow.insertCell(0);
                notesCell.colSpan = 6; // Span across all columns
                notesCell.innerText = concert.Notes;
            });
        })
        .catch(error => {
            console.error('Error fetching concerts data:', error);
        });

    // Fetch and populate the Art table with two-row structure
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
});
