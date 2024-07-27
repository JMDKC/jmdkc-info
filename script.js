document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('view-lift-btn').addEventListener('click', () => {
        const selectedLift = document.getElementById('lift').value;
        fetch('lifts.json')
            .then(response => response.json())
            .then(data => {
                const bestLift = data.filter(lift => lift.lift === selectedLift)
                    .reduce((max, lift) => lift.weight > max.weight ? lift : max, { weight: 0 });

                if (bestLift.weight > 0) {
                    document.getElementById('result').innerHTML = `
                        <p><strong>Lift:</strong> ${bestLift.lift}</p>
                        <p><strong>Weight:</strong> ${bestLift.weight} kg</p>
                        <p><strong>Date:</strong> ${bestLift.date}</p>
                    `;
                } else {
                    document.getElementById('result').innerHTML = '<p>No records found</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching best lift data:', error);
                document.getElementById('result').innerHTML = '<p>Error fetching data</p>';
            });
    });

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
});
