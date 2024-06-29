document.addEventListener('DOMContentLoaded', function() {
    // Best lifts data (simulate JSON fetch for simplicity)
    const bestLifts = {
        "front squat": { weight: 120, date: "2023-06-12", variation: "from rack" },
        "snatch": { weight: 90, date: "2023-06-14", variation: "from floor" },
        "clean & jerk": { weight: 110, date: "2023-06-16", variation: "from floor" }
    };

    document.getElementById('view-lift-btn').addEventListener('click', function() {
        const lift = document.getElementById('lift').value;
        const resultDiv = document.getElementById('result');

        if (bestLifts[lift]) {
            const { weight, date, variation } = bestLifts[lift];
            resultDiv.innerHTML = `
                <p><strong>Lift:</strong> ${lift}</p>
                <p><strong>Weight:</strong> ${weight} kg</p>
                <p><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</p>
                <p><strong>Variation:</strong> ${variation}</p>
            `;
        } else {
            resultDiv.innerHTML = "No records found.";
        }
    });

    // Fetch competition results
    fetch('comp-results.json')
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#competition-results tbody');
            tbody.innerHTML = ''; // Clear existing rows

            data.forEach(result => {
                const row = document.createElement('tr');
                
                Object.keys(result).forEach(key => {
                    const cell = document.createElement('td');
                    if (key === "Date") {
                        // Convert date from serial format to readable format
                        const date = new Date((result[key] - (25567 + 2)) * 86400 * 1000);
                        cell.innerText = date.toLocaleDateString();
                    } else {
                        cell.innerText = result[key];
                    }
                    row.appendChild(cell);
                });

                tbody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching competition results:', error));
});
