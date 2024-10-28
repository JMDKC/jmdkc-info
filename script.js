document.addEventListener('DOMContentLoaded', () => {
    const artTable = document.getElementById('art-table');
    const booksTable = document.getElementById('books-table');
    const concertsTable = document.getElementById('concerts-table');
    const compResultsTable = document.getElementById('comp-results');

    const maxRows = 10;

    // Initialize tables with the correct structure and "See More" functionality
    function initTable(table, data, isPairedRows = true, addSeeMore = true, fieldMap = {}) {
        const tbody = table.querySelector('tbody');
        let expanded = false;

        if (addSeeMore) {
            let seeMoreLink = table.parentNode.querySelector('.see-more');
            if (seeMoreLink) seeMoreLink.remove();

            seeMoreLink = document.createElement('a');
            seeMoreLink.href = '#';
            seeMoreLink.textContent = 'See More';
            seeMoreLink.className = 'see-more';
            seeMoreLink.style.display = 'block';
            seeMoreLink.style.textAlign = 'center';
            seeMoreLink.style.margin = '10px 0';
            table.parentNode.appendChild(seeMoreLink);

            seeMoreLink.addEventListener('click', (event) => {
                event.preventDefault();
                expanded = !expanded;
                renderTable(expanded ? data.length : maxRows);
                seeMoreLink.textContent = expanded ? 'See Less' : 'See More';
            });
        }

        const renderTable = (rowsToShow) => {
            tbody.innerHTML = '';
            data.slice(0, rowsToShow).forEach((item) => {
                if (isPairedRows) {
                    tbody.innerHTML += `
                        <tr>
                            <td>${item[fieldMap.title] || ''}</td>
                            <td>${item[fieldMap.col2] || ''}</td>
                            <td>${item[fieldMap.col3] || ''}</td>
                        </tr>
                        <tr class="notes-row">
                            <td colspan="3">${item.Notes || ''}</td>
                        </tr>
                    `;
                } else {
                    tbody.innerHTML += `
                        <tr>
                            <td>${item[fieldMap.date] || ''}</td>
                            <td>${item[fieldMap.where] || ''}</td>
                            <td>${item[fieldMap.name] || ''}</td>
                            <td>${item[fieldMap.snatch] || ''}</td>
                            <td>${item[fieldMap.cleanJerk] || ''}</td>
                            <td>${item[fieldMap.total] || ''}</td>
                            <td>${item[fieldMap.myWeight] || ''}</td>
                            <td>${item[fieldMap.sinclair] || ''}</td>
                        </tr>
                    `;
                }
            });
        };

        renderTable(maxRows);
    }

    // Fetch data and initialize tables
    const fetchData = async (url, table, isPairedRows = true, addSeeMore = true, fieldMap = {}) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            initTable(table, data, isPairedRows, addSeeMore, fieldMap);
        } catch (error) {
            console.error(`Error fetching data from ${url}: ${error}`);
        }
    };

    // Define the field mappings for each table
    const fieldMappings = {
        art: { title: 'Title', col2: 'Gallery', col3: 'Date' },
        books: { title: 'Title', col2: 'Author', col3: 'Date' },
        concerts: { title: 'Title', col2: 'Composer(s)', col3: 'Conductor', col4: 'Cast/Soloist', col5: 'Venue', col6: 'Date' },
        compResults: { date: 'Date', where: 'Where', name: 'Name', snatch: 'Snatch', cleanJerk: 'Clean & Jerk', total: 'Total', myWeight: 'My Weight', sinclair: 'Sinclair' }
    };

    // Fetch and initialize data for each table with correct field mapping
    fetchData('art.json', artTable, true, true, fieldMappings.art);
    fetchData('books.json', booksTable, true, true, fieldMappings.books);
    fetchData('concerts.json', concertsTable, true, true, fieldMappings.concerts);
    fetchData('comp-results.json', compResultsTable, false, false, fieldMappings.compResults);

    // Handle Best Lift Dropdown and View Button
    const liftDropdown = document.getElementById('lift');
    const viewLiftBtn = document.getElementById('view-lift-btn');
    const resultDiv = document.getElementById('result');

    const loadLifts = async () => {
        try {
            const response = await fetch('lifts.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const liftsData = await response.json();

            liftDropdown.innerHTML = Object.keys(liftsData).map(
                lift => `<option value="${lift}">${lift}</option>`
            ).join('');
        } catch (error) {
            console.error(`Error loading lift options: ${error}`);
        }
    };

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

    loadLifts(); // Populate dropdown on load
});
