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
    console.log('Filtered lifts:', lifts);  // Debugging log
    if (lifts.length === 0) {
        return null;
    }
    return lifts.reduce((max, lift) => lift.weight > max.weight ? lift : max, lifts[0]);
}

function excelDateToJSDate(serial) {
    const excelEpoch = new Date(Date.UTC(1899, 11, 30));
    const jsDate = new Date(excelEpoch.getTime() + serial * 86400000);
    return jsDate;
}

function formatDate(date) {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function displayResult(lift) {
    const resultDiv = document.getElementById('result');
    if (lift) {
        const dateObj = excelDateToJSDate(lift.date);
        const formattedDate = formatDate(dateObj);

        resultDiv.innerHTML = `
            <p><strong>Lift:</strong> ${lift.lift}</p>
            <p><strong>Weight:</strong> ${lift.weight} kg</p>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Variation:</strong> ${lift.variation}</p>
        `;
    } else {
        resultDiv.innerHTML = '<p>No records found.</p>';
    }
}
