document.addEventListener("DOMContentLoaded", () => {
    const liftDataUrl = "path/to/lifts.json";  // Correct path for your lift data
    const compDataUrl = "path/to/competitions.json";  // Correct path for your competition data
    const artDataUrl = "path/to/art.json";
    const booksDataUrl = "path/to/books.json";
    const concertsDataUrl = "path/to/concerts.json";

    let liftData = {};
    let compData = [];
    let artData = [];
    let booksData = [];
    let concertsData = [];
    const rowsToShow = 10;

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

    // Fetch art data
    fetch(artDataUrl)
        .then(response => response.json())
        .then(data => {
            artData = data;
            populateArtTable();
        })
        .catch(error => console.error("Error fetching art data:", error));

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

    // Populate the dropdown for weightlifting
    function populateLiftDropdown() {
        const liftDropdown = document.getElementById("lift");
        Object.keys(liftData).forEach(lift => {
            const option = document.createElement("option");
            option.value = lift;
            option.textContent = lift;
            liftDropdown.appendChild(option);
        });
    }

    // Handle the View Best Lift button
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
    function populateCompetitionTable() {
        const compResultsTableBody = document.querySelector("#comp-results tbody");
        compData.forEach(result => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${result.Where}</td>
                <td>${result.Date}</td>
                <td>${result.Name}</td>
                <td>${result.Snatch}</td>
                <td>${result["Clean & Jerk"]}</td>
                <td>${result.Total}</td>
                <td>${result["My Weight"]}</td>
                <td>${result.Sinclair}</td>
            `;
            compResultsTableBody.appendChild(row);
        });
    }

    // Populate art table with See More functionality
    function populateArtTable() {
        const artTableBody = document.querySelector("#art-table tbody");
        let isExpanded = false;

        function renderArtTable(artList) {
            artTableBody.innerHTML = "";
            artList.forEach((item, index) => {
                const row1 = document.createElement("tr");
                row1.innerHTML = `<td>${item.Title}</td><td>${item.Gallery}</td><td>${item.Date}</td>`;
                const row2 = document.createElement("tr");
                row2.innerHTML = `<td colspan="3">${item.Notes}</td>`;
                artTableBody.appendChild(row1);
                artTableBody.appendChild(row2);
            });
        }

        document.querySelector(".see-more[data-section='art']").addEventListener("click", (e) => {
            e.preventDefault();
            if (isExpanded) {
                renderArtTable(artData.slice(0, rowsToShow));
                e.target.textContent = "See More";
            } else {
                renderArtTable(artData);
                e.target.textContent = "See Less";
            }
            isExpanded = !isExpanded;
        });

        renderArtTable(artData.slice(0, rowsToShow));
    }

    // Populate books table with See More functionality
    function populateBooksTable() {
        const booksTableBody = document.querySelector("#books-table tbody");
        let isExpanded = false;

        function renderBooksTable(bookList) {
            booksTableBody.innerHTML = "";
            bookList.forEach((item, index) => {
                const row1 = document.createElement("tr");
                row1.innerHTML = `<td>${item.Title}</td><td>${item.Author}</td><td>${item.Date}</td>`;
                const row2 = document.createElement("tr");
                row2.innerHTML = `<td colspan="3">${item.Notes}</td>`;
                booksTableBody.appendChild(row1);
                booksTableBody.appendChild(row2);
            });
        }

        document.querySelector(".see-more[data-section='books']").addEventListener("click", (e) => {
            e.preventDefault();
            if (isExpanded) {
                renderBooksTable(booksData.slice(0, rowsToShow));
                e.target.textContent = "See More";
            } else {
                renderBooksTable(booksData);
                e.target.textContent = "See Less";
            }
            isExpanded = !isExpanded;
        });

        renderBooksTable(booksData.slice(0, rowsToShow));
    }

    // Populate concerts table with See More functionality
    function populateConcertsTable() {
        const concertsTableBody = document.querySelector("#concerts-table tbody");
        let isExpanded = false;

        function renderConcertsTable(concertList) {
            concertsTableBody.innerHTML = "";
            concertList.forEach((item, index) => {
                const row1 = document.createElement("tr");
                row1.innerHTML = `<td>${item.Title}</td><td>${item["Composer(s)"]}</td><td>${item.Conductor}</td><td>${item["Cast/Soloist"]}</td><td>${item.Venue}</td><td>${item.Date}</td>`;
                const row2 = document.createElement("tr");
                row2.innerHTML = `<td colspan="6">${item.Notes}</td>`;
                concertsTableBody.appendChild(row1);
                concertsTableBody.appendChild(row2);
            });
        }

        document.querySelector(".see-more[data-section='concerts']").addEventListener("click", (e) => {
            e.preventDefault();
            if (isExpanded) {
                renderConcertsTable(concertsData.slice(0, rowsToShow));
                e.target.textContent = "See More";
            } else {
                renderConcertsTable(concertsData);
                e.target.textContent = "See Less";
            }
            isExpanded = !isExpanded;
        });

        renderConcertsTable(concertsData.slice(0, rowsToShow));
    }
});
