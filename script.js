document.addEventListener('DOMContentLoaded', function() {
    // Load best lifts (existing functionality)
    document.getElementById('view-lift-btn').addEventListener('click', function() {
        const lift = document.getElementById('lift').value;
        document.getElementById('result').innerText = `Selected lift: ${lift}`;
    });

    // Load competition results
    fetch('comp-results.json')
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#competition-results tbody');
            tbody.innerHTML = ''; // Clear existing rows
            
            data.forEach(result => {
                const row = document.createElement('tr');
                
                Object.keys(result).forEach(key => {
                    const cell = document.createElement('td');
                    cell.innerText = result[key];
                    row.appendChild(cell);
                });

                tbody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching competition results:', error));
});
