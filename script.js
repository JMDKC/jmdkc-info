document.addEventListener('DOMContentLoaded', () => {
    const artTable = document.getElementById('art-table');
    const booksTable = document.getElementById('books-table');
    const concertsTable = document.getElementById('concerts-table');
    const compResultsTable = document.getElementById('comp-results');

    const maxRows = 10; // Limit the initial number of rows displayed

    // Function to initialize the table with a 'See More' link
    function initTable(table, data) {
        const tbody = table.querySelector('tbody');
        const seeMoreContainer = document.createElement('div');
        seeMoreContainer.style.textAlign = 'center';
        seeMoreContainer.style.marginTop = '10px';

        let expanded = false;

        const renderTable = (rowsToShow) => {
            tbody.innerHTML = '';
            data.slice(0, rowsToShow).forEach((item) => {
                let row = `
                    <tr>
                        <td>${item.Title || item['Composer(s)'] || item.Where || ''}</td>
                        <td>${item.Gallery || item.Conductor || item.Date || ''}</td>
                        <td>${item.Date || item.Venue || item['Name'] || ''}</td>
                    </tr>
                    <tr class="notes-row">
                        <td colspan="3">${item.Notes || ''}</td>
                    </tr>
                `;
                tbody.innerHTML += row;
            });
        };

        renderTable(maxRows); // Display the initial set of rows

        // Create and append the 'See More' link
        seeMoreContainer.innerHTML = `<a href="#" class="see-more">See More</a>`;
        table.parentNode.appendChild(seeMoreContainer);

        // Event listener for the 'See More' link
        seeMoreContainer.querySelector('.see-more').addEventListener('click', (event) => {
            event.preventDefault();
            expanded = !expanded;

            if (expanded) {
                renderTable(data.length); // Show all rows
                seeMoreContainer.innerHTML = `<a href="#" class="see-more">See Less</a>`;
            } else {
                renderTable(maxRows); // Show only the limited rows
                seeMoreContainer.innerHTML = `<a href="#" class="see-more">See More</a>`;
            }

            // Smooth expansion effect
            tbody.style.transition = 'max-height 0.5s ease-in-out';
            tbody.style.maxHeight = expanded ? '1000px' : '300px';
        });
    }

    // Fetching data and initializing each table
    const fetchData = async (url, table) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            initTable(table, data);
        } catch (error) {
            console.error(`Error fetching data from ${url}: ${error}`);
        }
    };

    // Fetching data for all the tables
    fetchData('art.json', artTable);
    fetchData('books.json', booksTable);
    fetchData('concerts.json', concertsTable);
    fetchData('comp-results.json', compResultsTable);

    // Function to fetch and display best lift data
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
