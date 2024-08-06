document.addEventListener('DOMContentLoaded', () => {
    const viewLiftBtn = document.getElementById('view-lift-btn');
    const resetLink = document.getElementById('reset');
    const resultDiv = document.getElementById('result');
    const liftSelect = document.getElementById('lift');

    viewLiftBtn.addEventListener('click', () => {
        const selectedLift = liftSelect.value;
        fetch('lifts.json')
            .then(response => response.json())
            .then(data => {
                const bestLift = data.filter(lift => lift.lift === selectedLift)
                    .reduce((max, lift) => lift.weight > max.weight ? lift : max, { weight: 0 });

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
                resultDiv.innerHTML = '<p>Error fetching data</p>';
                resultDiv.style.display = 'block';
            });
    });

    resetLink.addEventListener('click', (e) => {
        e.preventDefault();
        resultDiv.style.display = 'none';
        resultDiv.innerHTML = '';
        liftSelect.selectedIndex = 0;
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
