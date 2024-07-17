// Function to fetch and display the best lift
document.getElementById('view-lift-btn').addEventListener('click', function() {
    fetch('lifts.json')
        .then(response => response.json())
        .then(data => {
            console.log('Fetched lifts data:', data); // Log fetched data
            const selectedLift = document.getElementById('lift').value;
            const bestLift = data.filter(lift => lift.lift === selectedLift)
                                .reduce((prev, current) => (prev.weight > current.weight) ? prev : current, {});

            if (bestLift && bestLift.weight) {
                document.getElementById('result').innerHTML = `
                    Best ${bestLift.lift}:<br>
                    Weight: ${bestLift.weight} kg<br>
                    Date: ${bestLift.date}
                `;
            } else {
                document.getElementById('result').innerHTML = 'No records found';
            }
        })
        .catch(error => console.error('Error fetching best lift data:', error));
});

// Function to fetch and display competition results
function fetchCompetitionResults() {
    fetch('comp-results.json')
        .then(response => response.json())
        .then(data => {
            console.log('Fetched competition results data:', data); // Log fetched data
            const tbody = document.querySelector('#comp-results tbody');
            tbody.innerHTML = ''; // Clear any existing rows

            data.forEach(result => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${result.Where}</td>
                    <td>${result.Date}</td>
                    <td>${result.Name}</td>
                    <td>${result.Snatch}</td>
                    <td>${result['Clean & Jerk']}</td>
                    <td>${result.Total}</td>
                    <td>${result['My Weight']}</td>
                    <td>${result.Sinclair}</td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching competition results:', error));
}

// Fetch competition results on page load
document.addEventListener('DOMContentLoaded', fetchCompetitionResults);
