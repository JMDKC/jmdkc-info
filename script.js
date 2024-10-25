document.addEventListener('DOMContentLoaded', () => {
    const artTable = document.getElementById('art-table');
    const booksTable = document.getElementById('books-table');
    const concertsTable = document.getElementById('concerts-table');
    const compResultsTable = document.getElementById('comp-results');

    const maxRows = 10;

    // Initialize tables with a specific structure and 'See More' functionality
    function initTable(table, data, isPairedRows = true) {
        const tbody = table.querySelector('tbody');
        let expanded = false;
        let seeMoreLink = table.parentNode.querySelector('.see-more');

        // Remove existing 'See More' link to prevent duplicates
        if (seeMoreLink) seeMoreLink.remove();

        // Rendering rows function
        const renderTable = (rowsToShow) => {
            tbody.innerHTML = '';
            data.slice(0, rowsToShow).forEach((item) => {
                if (isPairedRows) {
                    let row = `
                        <tr>
                            <td>${item.Title || ''}</td>
                            <td>${item.Gallery || item['Composer(s)'] || item.Conductor || ''}</td>
                            <td>${item.Date || item.Venue || ''}</td>
                        </tr>
                        <tr class="notes-row">
                            <td colspan="3">${item.Notes || ''}</td>
                        </tr>
                    `;
                    tbody.innerHTML += row;
                } else {
                    let row = `
                        <tr>
                            <td>${item.Competition || ''}</td>
                            <td>${item.Snatch || ''}</td>
                            <td>${item['Clean & Jerk'] || ''}</td>
                            <td>${item.Total || ''}</td>
                            <td>${item.Date || ''}</td>
                        </tr>
                    `;
                    tbody.innerHTML += row;
                }
            });
        };

        renderTable(maxRows); // Show limited rows initially

        // Create 'See More' / 'See Less' link
        seeMoreLink = document.createElement('a');
        seeMoreLink.href = '#';
        seeMoreLink.textContent = 'See More';
        seeMoreLink.className = 'see-more';
        seeMoreLink.style.display = 'block';
        seeMoreLink.style.textAlign = 'center';
        seeMoreLink.style.margin = '10px 0';

        table.parentNode.appendChild(seeMoreLink);

        // Event listener to toggle "See More" and "See Less"
        seeMoreLink.addEventListener('click', (event) => {
            event.preventDefault();
            expanded = !expanded;

            if (expanded) {
                renderTable(data.length); // Show all rows
                seeMoreLink.textContent = 'See Less';
            } else {
                renderTable(maxRows); // Show limited rows again
                seeMoreLink.textContent = 'See More';
            }

            // Smooth expansion effect
            tbody.style.transition = 'max-height 0.5s ease-in-out';
            tbody.style.maxHeight = expanded ? '1000px' : '300px';
        });
    }

    // Fetching data for each section and initializing tables
    const fetchData = async (url, table, isPairedRows = true) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            initTable(table, data, isPairedRows);
        } catch (error) {
            console.error(`Error fetching data from ${url}: ${error}`);
        }
    };

    // Fetch and initialize data for each specific table
    fetchData('art.json', artTable);
    fetchData('books.json', booksTable);
    fetchData('concerts.json', concertsTable);
    fetchData('comp-results.json', compResultsTable, false); // No paired rows for competition results

    // Handle Best Lift Data Retrieval
    const liftDropdown = document.getElementById('lift');
    const viewLiftBtn = document.getElementById('view-lift-btn');
    const resultDiv = document.getElementById('result');

    viewLiftBtn.addEventListener('click', async () => {
        const selectedLift = liftDropdown.value;

        try {
            const response = await fetch('lifts.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const liftsData = await response.json();

            const bestLift = liftsData[selectedLift];
            if (bestLift) {
                resultDiv.textContent = `Best ${selectedLift}: ${bestLift.weight} kg (${bestLift.date})`;
                resultDiv.style.display = 'block';
            } else {
                resultDiv.textContent = `No data available for ${selectedLift}.`;
                resultDiv.style.display = 'block';
            }
        } catch (error) {
            console.error(`Error fetching lift data: ${error}`);
        }
    });
});
