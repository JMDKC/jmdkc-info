document.getElementById('view-lift-btn').addEventListener('click', () => {
    const selectedLift = document.getElementById('lift').value;

    fetch('lifts.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
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
