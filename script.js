document.getElementById('view-lift-btn').addEventListener('click', () => {
    const selectedLift = document.getElementById('lift').value.toLowerCase();
    fetch('lifts.json')
        .then(response => response.json())
        .then(data => {
            const bestLift = findBestLift(data, selectedLift);
            displayResult(bestLift);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});

function findBestLift(data, liftName) {
    const lifts = data.filter(item => item.lift.toLowerCase() === liftName);
    if (lifts.length === 0) {
        return null;
    }
    return lifts.reduce((max, lift) => lift.weight > max.weight ? lift : max, lifts[0]);
}

function displayResult(lift) {
    const resultDiv = document.getElementById('result');
    if (lift) {
        resultDiv.innerHTML = `
            <p><strong>Lift:</strong> ${lift.lift}</p>
            <p><strong>Weight:</strong> ${lift.weight} kg</p>
            <p><strong>Date:</strong> ${lift.date}</p>
            <p><strong>Variation:</strong> ${lift.variation}</p>
        `;
    } else {
        resultDiv.innerHTML = '<p>No records found.</p>';
    }
}
