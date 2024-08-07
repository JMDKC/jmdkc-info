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
