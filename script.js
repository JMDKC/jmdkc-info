document.addEventListener('DOMContentLoaded', () => {

    // Function to log and test JSON data fetching
    function testJsonFetching(url) {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(`Data from ${url}:`, data);  // Debug: Log fetched data
                return data;
            })
            .catch(error => {
                console.error(`Error fetching data from ${url}:`, error);
                return null;
            });
    }

    // Test fetching the competition results JSON
    testJsonFetching('comp-results.json')
        .then(data => {
            if (data) {
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
            } else {
                console.warn('No competition results data available.');
            }
        });

    // Check if the elements exist before adding event listeners
    const viewLiftBtn = document.getElementById('view-lift-btn');
    const resetBtn = document.getElementById('reset-btn');

    if (viewLiftBtn) {
        // Test fetching the lifts JSON and processing it
        viewLiftBtn.addEventListener('click', () => {
            testJsonFetching('lifts.json')
                .then(data => {
                    if (data) {
                        const selectedLift = document.getElementById('lift').value;
                        const bestLift = data.filter(lift => lift.lift === selectedLift)
                            .reduce((max, lift) => lift.weight > max.weight ? lift : max, {weight: 0});

                        if (bestLift.weight > 0) {
                            document.getElementById('result').innerHTML = `
                                <p>lift: ${bestLift.lift}</p>
                                <p>weight: ${bestLift.weight} kg</p>
                                <p>date: ${bestLift.date}</p>
                            `;
                        } else {
                            document.getElementById('result').innerHTML = '<p>No records found</p>';
                        }
                    } else {
                        document.getElementById('result').innerHTML = '<p>Error fetching data</p>';
                    }
                });
        });
    }

    if (resetBtn) {
        // Reset button functionality
        resetBtn.addEventListener('click', () => {
            const liftSelect = document.getElementById('lift');
            if (liftSelect) liftSelect.selectedIndex = 0;
            document.getElementById('result').innerHTML = '';  // Clear the result box
        });
    }

    // Test fetching other JSON data (e.g., art, books, concerts) as needed
    testJsonFetching('art.json')
        .then(data => {
            // Process art data and update the art table
        });

    testJsonFetching('books.json')
        .then(data => {
            // Process books data and update the books table
        });

    testJsonFetching('concerts.json')
        .then(data => {
            // Process concerts data and update the concerts table
        });

});
