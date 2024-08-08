document.addEventListener('DOMContentLoaded', () => {
    // Function to fetch and display best lift
    document.getElementById('view-lift-btn').addEventListener('click', () => {
        const selectedLift = document.getElementById('lift').value;
        fetch('lifts.json')
            .then(response => response.json())
            .then(data => {
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

    // Function to reset the form and hide the result
    document.getElementById('reset').addEventListener('click', (event) => {
        event.preventDefault();
        document.getElementById('lift').selectedIndex = 0;
        document.getElementById('result').style.display = 'none';
    });

    // Function to fetch and display competition results
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
                row.insertCell(4).innerText = record.CleanJerk;
                row.insertCell(5).innerText = record.Total;
                row.insertCell(6).innerText = record.MyWeight;
                row.insertCell(7).innerText = record.Sinclair;
            });
        })
        .catch(error => {
            console.error('Error fetching competition results data:', error);
        });
});
