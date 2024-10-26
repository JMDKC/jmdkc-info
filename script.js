document.addEventListener('DOMContentLoaded', () => {
    const artTable = document.getElementById('art-table');
    const booksTable = document.getElementById('books-table');
    const concertsTable = document.getElementById('concerts-table');
    const compResultsTable = document.getElementById('comp-results');

    const maxRows = 10;

    // Initialize tables with a specific structure and 'See More' functionality
    function initTable(table, data, isPairedRows = true, addSeeMore = true) {
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
                            <td>${item.Title || ''}</td>
                            <td>${item.Gallery || item['Composer(s)'] || item.Conductor || ''}</td>
                            <td>${item.Date || item.Venue || ''}</td>
                        </tr>
                        <tr class="notes-row">
                            <td colspan="3">${item.Notes || ''}</td>
                        </tr>
                    `;
                } else {
                    tbody.innerHTML += `
                        <tr>
                            <td>${item.Date || ''}</td>
                            <td>${item.Competition || ''}</td>
                            <td>${item.Snatch || ''}</td>
                            <td>${item['Clean & Jerk'] || ''}</td>
                            <td>${item.Total || ''}</td>
                            <td>${item['My Weight'] || ''}</td>
                            <td>${item.Sinclair || ''}</td>
                        </tr>
                    `;
                }
            });
        };

        renderTable(maxRows);
    }

    // Fetch and initialize data
    const fetchData = async (url, table, isPairedRows = true, addSeeMore = true) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            initTable(table, data, isPairedRows, addSeeMore);
        } catch (error) {
            console.error(`Error fetching data from ${url}: ${error}`);
        }
    };

    // Fetch data for each table
    fetchData('art.json', artTable);
    fetchData('books.json', booksTable);
    fetchData('concerts.json', concertsTable);
    fetchData('comp-results.json', compResultsTable, false, false); // No paired rows or "See More" for weightlifting results

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
