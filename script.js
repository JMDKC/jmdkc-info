document.getElementById('view-lift-btn').addEventListener('click', () => {
    const selectedLift = document.getElementById('lift').value;

    fetch('lifts.json')
        .then(response => response.json())
        .then(data => {
            const bestLift = data.find(lift => lift.lift.toLowerCase() === selectedLift.toLowerCase());

            const resultDiv = document.getElementById('result');
            if (bestLift) {
                const liftDate = new Date((bestLift.date - 25569) * 86400 * 1000).toLocaleDateString(); // Excel date conversion
                resultDiv.innerHTML = `
                    <p>Lift: ${bestLift.lift}</p>
                    <p>Weight: ${bestLift.weight} kg</p>
                    <p>Date: ${liftDate}</p>
                `;
            } else {
                resultDiv.innerHTML = `<p>No records found for ${selectedLift}.</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching lifts:', error);
            document.getElementById('result').innerHTML = `<p>Error fetching lifts. Please try again later.</p>`;
        });
});

// Fetch and display competition results
fetch('comp-results.json')
    .then(response => response.json())
    .then(data => {
        const compResultsTableBody = document.querySelector('#comp-results tbody');
        compResultsTableBody.innerHTML = ''; // Clear any existing rows

        data.forEach(result => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${result.Where}</td>
                <td>${new Date(result.Date).toLocaleDateString()}</td>
                <td>${result.Name}</td>
                <td>${result.Snatch}</td>
                <td>${result["Clean & Jerk"]}</td>
                <td>${result.Total}</td>
                <td>${result["My Weight"]}</td>
                <td>${result.Sinclair}</td>
            `;
            compResultsTableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error fetching competition results:', error);
    });
