document.addEventListener('DOMContentLoaded', function() {
    // Best lifts data
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
            const formattedDate = new Date(date).toLocaleDateString();
            resultDiv.innerHTML = `
                <p><strong>Lift:</strong> ${lift}</p>
                <p><strong>Weight:</strong> ${weight} kg</p>
                <p><strong>Date:</strong> ${formattedDate}</p>
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
                        // Use Date.parse for proper parsing and format date
                        const date = new Date(result[key]);
                        if (isNaN(date.getTime())) {
                            cell.innerText = "Invalid Date";
                        } else {
                            cell.innerText = date.toLocaleDateString();
                        }
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
