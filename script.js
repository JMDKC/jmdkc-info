document.addEventListener("DOMContentLoaded", () => {
    // Define the paths to the JSON files
    const liftDataUrl = "lifts.json"; // Path to the lifts JSON
    const compDataUrl = "comp-results.json"; // Path to competitions JSON
    const artDataUrl = "art.json"; // Path to art JSON
    const booksDataUrl = "books.json"; // Path to books JSON
    const concertsDataUrl = "concerts.json"; // Path to concerts JSON

    let liftData = {};
    let compData = [];
    let artData = [];
    let booksData = [];
    let concertsData = [];

    // Fetch lift data
    fetch(liftDataUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();  // Use text() to inspect the full response
    })
    .then(data => {
        console.log("Fetched data:", data);  // Log the raw response for inspection
        liftData = JSON.parse(data);
        populateLiftDropdown();
    })
    .catch(error => console.error("Error fetching lift data:", error));

    // Fetch competition data
    fetch(compDataUrl)
        .then(response => response.json())
        .then(data => {
            compData = data;
            populateCompTable();
        })
        .catch(error => console.error("Error fetching competition data:", error));

    // Fetch art data
    fetch(artDataUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();  // Use text() to inspect the full response
    })
    .then(data => {
        console.log("Fetched Art data:", data);  // Log the raw response for inspection
        artData = JSON.parse(data);  // Parse it as JSON
        populateArtTable();  // Call the function to populate the table
    })
    .catch(error => console.error("Error fetching Art data:", error));

    // Fetch books data
    fetch(booksDataUrl)
        .then(response => response.json())
        .then(data => {
            booksData = data;
            populateBooksTable();
        })
        .catch(error => console.error("Error fetching books data:", error));

    // Fetch concerts data
    fetch(concertsDataUrl)
        .then(response => response.json())
        .then(data => {
            concertsData = data;
            populateConcertsTable();
        })
        .catch(error => console.error("Error fetching concerts data:", error));

    // Populate the dropdown for lifts
    function populateLiftDropdown() {
        const liftDropdown = document.getElementById("lift");
        Object.keys(liftData).forEach(lift => {
            const option = document.createElement("option");
            option.value = lift;
            option.textContent = lift;
            liftDropdown.appendChild(option);
        });
    }

    // Event listener for the "View Best Lift" button
    document.getElementById("view-lift-btn").addEventListener("click", () => {
        const selectedLift = document.getElementById("lift").value;
        const resultDiv = document.getElementById("result");

        if (liftData[selectedLift]) {
            resultDiv.textContent = `Best ${selectedLift}: ${liftData[selectedLift]} kg`;
            resultDiv.style.display = "block";
        } else {
            resultDiv.textContent = `No data available for ${selectedLift}.`;
            resultDiv.style.display = "block";
        }
    });

    // Populate competition results table
    function populateCompTable() {
        const compTableBody = document.querySelector("#comp-results tbody");
        compData.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.Where}</td>
                <td>${item.Date}</td>
                <td>${item.Name}</td>
                <td>${item.Snatch}</td>
                <td>${item['Clean & Jerk']}</td>
                <td>${item.Total}</td>
                <td>${item['My Weight']}</td>
                <td>${item.Sinclair}</td>
            `;
            compTableBody.appendChild(row);
        });
    }

    // Populate the art table
    function populateArtTable() {
        const artTableBody = document.querySelector("#art-table tbody");
        artData.forEach(item => {
            const row1 = document.createElement("tr");
            row1.innerHTML = `
                <td>${item.Title}</td>
                <td>${item.Gallery}</td>
                <td>${item.Date}</td>
            `;
            const row2 = document.createElement("tr");
            row2.innerHTML = `<td colspan="3">${item.Notes}</td>`;
            artTableBody.appendChild(row1);
            artTableBody.appendChild(row2);
        });
    }

    // Populate the books table
    function populateBooksTable() {
        const booksTableBody = document.querySelector("#books-table tbody");
        booksData.forEach(item => {
            const row1 = document.createElement("tr");
            row1.innerHTML = `
                <td>${item.Title}</td>
                <td>${item.Author}</td>
                <td>${item.Date}</td>
            `;
            const row2 = document.createElement("tr");
            row2.innerHTML = `<td colspan="3">${item.Notes}</td>`;
            booksTableBody.appendChild(row1);
            booksTableBody.appendChild(row2);
        });
    }

    // Populate the concerts table
    function populateConcertsTable() {
        const concertsTableBody = document.querySelector("#concerts-table tbody");
        concertsData.forEach(item => {
            const row1 = document.createElement("tr");
            row1.innerHTML = `
                <td>${item.Title}</td>
                <td>${item["Composer(s)"]}</td>
                <td>${item.Conductor}</td>
                <td>${item["Cast/Soloist"]}</td>
                <td>${item.Venue}</td>
                <td>${item.Date}</td>
            `;
            const row2 = document.createElement("tr");
            row2.innerHTML = `<td colspan="6">${item.Notes}</td>`;
            concertsTableBody.appendChild(row1);
            concertsTableBody.appendChild(row2);
        });
    }

    // Add functionality to limit table rows initially (show first 10 rows)
    function limitTableRows(tableId, data, populateFunction) {
        const tableBody = document.querySelector(`${tableId} tbody`);
        const seeMoreLink = document.createElement('a');
        seeMoreLink.href = "#";
        seeMoreLink.textContent = "See More";
        seeMoreLink.classList.add("see-more-link");

        // Initially populate only the first 10 items
        const limitedData = data.slice(0, 10);
        populateFunction(limitedData);

        // Append "See More" link if there are more than 10 items
        if (data.length > 10) {
            tableBody.parentElement.appendChild(seeMoreLink);
            seeMoreLink.addEventListener("click", (e) => {
                e.preventDefault();
                // Clear existing data and populate with full data
                tableBody.innerHTML = "";
                populateFunction(data);
                seeMoreLink.remove();
            });
        }
    }

    // Apply row limiting to all relevant tables
    limitTableRows("#art-table", artData, populateArtTable);
    limitTableRows("#books-table", booksData, populateBooksTable);
    limitTableRows("#concerts-table", concertsData, populateConcertsTable);
});
