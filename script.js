document.addEventListener('DOMContentLoaded', () => {
    // Function to load data into a table
    function loadTableData(url, tableId) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const tableBody = document.getElementById(tableId).getElementsByTagName('tbody')[0];
                tableBody.innerHTML = ''; // Clear previous content

                data.forEach(record => {
                    const row = tableBody.insertRow();
                    Object.values(record).forEach(value => {
                        const cell = row.insertCell();
                        cell.innerText = value;
                    });
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    // Load data into each table
    loadTableData('art.json', 'art-results');
    loadTableData('books.json', 'books-results');
    loadTableData('concerts.json', 'concerts-results');

    // Load weightlifting data
    document.getElementById('view-lift-btn').addEventListener('click', () => {
        const selectedLift = document.getElementById('lift').value;
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

    // Reset function for lift section
    document.getElementById('reset').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('lift').selectedIndex = 0;
        document.getElementById('result').style.display = 'none';
    });
});
