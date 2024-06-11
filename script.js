async function viewBestLift() {
    const selectedLift = document.getElementById("lift").value;
    const jsonUrl = 'lifts.json'; // Path to the JSON file

    try {
        const response = await fetch(jsonUrl);
        const data = await response.json();

        // Filter and find the best lift
        const filteredData = data.filter(lift => lift.lift === selectedLift);
        filteredData.sort((a, b) => b.total - a.total);
        const bestLift = filteredData[0];

        // Update the table
        const table = document.getElementById("liftTable");
        table.innerHTML = "<tr><th>Date</th><th>Variation</th><th>Total (kg)</th></tr>";

        if (bestLift) {
            table.innerHTML += `
                <tr>
                    <td>${bestLift.date}</td>
                    <td>${bestLift.variation}</td>
                    <td>${bestLift.total}</td>
                </tr>
            `;
        } else {
            table.innerHTML += "<tr><td colspan='3'>No records found</td></tr>";
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
