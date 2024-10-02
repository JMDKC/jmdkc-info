document.addEventListener("DOMContentLoaded", () => {
    // Fetch the data for lifts and competition results
    const liftDataUrl = "path/to/lifts.json";  // Replace with correct URL or path
    const compDataUrl = "path/to/competitions.json";  // Replace with correct URL or path

    let liftData = {};
    let compData = [];

    // Fetch lift data
    fetch(liftDataUrl)
        .then(response => response.json())
        .then(data => {
            liftData = data;
            populateLiftDropdown();
        })
        .catch(error => console.error("Error fetching lift data:", error));

    // Fetch competition data
    fetch(compDataUrl)
        .then(response => response.json())
        .then(data => {
            compData = data;
            populateCompetitionTable();
        })
        .catch(error => console.error("Error fetching competition data:", error));

    // Populate dropdown with lift options
    function populateLiftDropdown() {
        const liftDropdown = document.getElementById("lift");
        liftDropdown.innerHTML = "";  // Clear the dropdown first
        Object.keys(liftData).forEach(lift => {
            const option = document.createElement("option");
            option.value = lift;
            option.textContent = lift;
            liftDropdown.appendChild(option);
        });
    }

    // Handle view best lift button
    const viewLiftButton = document.getElementById("view-lift-btn");
    const resultDiv = document.getElementById("result");

    viewLiftButton.addEventListener("click", () => {
        const selectedLift = document.getElementById("lift").value;
        const bestLift = liftData[selectedLift];

        if (bestLift) {
            resultDiv.style.display = "block";
            resultDiv.innerHTML = `<strong>Best ${selectedLift}:</strong> ${bestLift} kg`;
        } else {
            resultDiv.style.display = "block";
            resultDiv.innerHTML = `<strong>No data available for ${selectedLift}.</strong>`;
        }
    });

    // Populate competition results table
    function populateCompetitionTable() {
        const compTableBody = document.querySelector("#comp-results tbody");
        compTableBody.innerHTML = "";  // Clear table before populating

        if (compData.length === 0) {
            compTableBody.innerHTML = "<tr><td colspan='8'>No competition results available.</td></tr>";
        } else {
            compData.forEach((competition) => {
                const row = `
                    <tr>
                        <td>${competition.Where}</td>
                        <td>${competition.Date}</td>
                        <td>${competition.Name}</td>
                        <td>${competition.Snatch}</td>
                        <td>${competition["Clean & Jerk"]}</td>
                        <td>${competition.Total}</td>
                        <td>${competition["My Weight"]}</td>
                        <td>${competition.Sinclair}</td>
                    </tr>
                `;
                compTableBody.innerHTML += row;
            });
        }
    }

    // Reset functionality
    const resetLink = document.getElementById("reset");
    resetLink.addEventListener("click", (e) => {
        e.preventDefault();
        resultDiv.style.display = "none";
        document.getElementById("lift").value = "clean & jerk";  // Reset to default
    });
});
