// Helper to format date
function formatDate(date) {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  
  // Limit rows to display initially
  function limitTableRows(table, limit) {
    const rows = table.querySelectorAll("tbody tr");
    rows.forEach((row, index) => {
      row.style.display = index < limit ? "" : "none";
    });
  }
  
  // Handle See More button clicks
  function handleSeeMoreButtons(rowLimit) {
    document.querySelectorAll(".see-more").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent jumping to the top of the page
  
        const section = button.dataset.section;
        const table = document.querySelector(`#${section}-table`);
  
        if (!table) return;
  
        const rows = table.querySelectorAll("tbody tr");
        const isExpanded = button.classList.toggle("expanded");
  
        button.textContent = isExpanded ? "See Less" : "See More";
  
        rows.forEach((row, index) => {
          row.style.display = isExpanded || index < rowLimit ? "" : "none";
        });
  
        // Smoothly scroll back to the button
        button.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    });
  }
  
  // Populate Books Table
  function populateBooksTable() {
    fetch("books.json")
      .then((response) => response.json())
      .then((data) => {
        const booksTableBody = document.querySelector("#books-table tbody");
        booksTableBody.innerHTML = "";
  
        data
          .sort((a, b) => new Date(b.dateFinished) - new Date(a.dateFinished))
          .forEach((book) => {
            const row = `
              <tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${formatDate(book.dateStarted)}</td>
                <td>${formatDate(book.dateFinished)}</td>
              </tr>
            `;
            booksTableBody.innerHTML += row;
          });
  
        limitTableRows(booksTableBody.closest("table"), 10);
      })
      .catch((error) => console.error("Error loading books data:", error));
  }
  
  // Populate Art Table
  function populateArtTable() {
    fetch("art.json")
      .then((response) => response.json())
      .then((data) => {
        const artTableBody = document.querySelector("#art-table tbody");
        artTableBody.innerHTML = "";
  
        data
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .forEach((art) => {
            const row = `
              <tr>
                <td>${art.title}</td>
                <td>${art.gallery}</td>
                <td>${formatDate(art.date)}</td>
              </tr>
            `;
            artTableBody.innerHTML += row;
          });
  
        limitTableRows(artTableBody.closest("table"), 10);
      })
      .catch((error) => console.error("Error loading art data:", error));
  }
  
  // Populate Concerts Table
  function populateConcertsTable() {
    fetch("concerts.json")
      .then((response) => response.json())
      .then((data) => {
        const concertsTableBody = document.querySelector("#concerts-table tbody");
        concertsTableBody.innerHTML = "";
  
        data
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .forEach((concert) => {
            const row = `
              <tr>
                <td>${concert.title}</td>
                <td>${concert.composers}</td>
                <td>${concert.conductor}</td>
                <td>${concert.cast}</td>
                <td>${concert.venue}</td>
                <td>${formatDate(concert.date)}</td>
              </tr>
            `;
            concertsTableBody.innerHTML += row;
          });
  
        limitTableRows(concertsTableBody.closest("table"), 10);
      })
      .catch((error) => console.error("Error loading concerts data:", error));
  }
  
  // Populate Weightlifting Table
  function populateWeightliftingTable() {
    fetch("comp-results.json")
      .then((response) => response.json())
      .then((data) => {
        const tableBody = document.querySelector("#comp-results tbody");
        tableBody.innerHTML = "";
  
        data
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .forEach((result) => {
            const row = `
              <tr>
                <td>${result.where}</td>
                <td>${formatDate(result.date)}</td>
                <td>${result.name}</td>
                <td>${result.snatch}</td>
                <td>${result.cleanAndJerk}</td>
                <td>${result.total}</td>
                <td>${result.myWeight}</td>
                <td>${result.sinclair}</td>
              </tr>
            `;
            tableBody.innerHTML += row;
          });
  
        limitTableRows(tableBody.closest("table"), 10);
      })
      .catch((error) => console.error("Error loading weightlifting data:", error));
  }
  
  // Populate Lifts Dropdown
  function populateLiftsDropdown() {
    fetch("lifts.json")
      .then((response) => response.json())
      .then((data) => {
        const liftDropdown = document.querySelector("#choose-lift-dropdown");
        liftDropdown.innerHTML = "";
        const uniqueLifts = [...new Set(data.map((lift) => lift.lift))];
        uniqueLifts.forEach((lift) => {
          const option = `<option value="${lift}">${lift}</option>`;
          liftDropdown.innerHTML += option;
        });
      })
      .catch((error) => console.error("Error loading lifts data:", error));
  }
  
  // Show Best Lift
  function showBestLift() {
    const liftDropdown = document.querySelector("#choose-lift-dropdown");
    const selectedLift = liftDropdown.value;
    const bestLiftContainer = document.querySelector("#best-lift-container");
  
    if (!selectedLift) {
      alert("Please select a lift!");
      return;
    }
  
    fetch("lifts.json")
      .then((response) => response.json())
      .then((data) => {
        const bestLift = data
          .filter((lift) => lift.lift === selectedLift)
          .sort((a, b) => b.weight - a.weight)[0];
  
        if (bestLift) {
          const { weight, date } = bestLift;
          bestLiftContainer.innerHTML = `${weight}kg (${formatDate(date)}) <a href="#" id="reset-link">(reset)</a>`;
          bestLiftContainer.classList.remove("hidden");
  
          // Add reset functionality
          document.getElementById("reset-link").addEventListener("click", (e) => {
            e.preventDefault();
            bestLiftContainer.innerHTML = "";
            bestLiftContainer.classList.add("hidden");
          });
        } else {
          bestLiftContainer.innerHTML = "No data available.";
          bestLiftContainer.classList.remove("hidden");
        }
      })
      .catch((error) => console.error("Error finding best lift:", error));
  }
  
  // Initialize tables and dropdowns
  document.addEventListener("DOMContentLoaded", () => {
    populateBooksTable();
    populateArtTable();
    populateConcertsTable();
    populateWeightliftingTable();
    populateLiftsDropdown();
  
    handleSeeMoreButtons(10);
  
    // Add functionality to View Best Lift button
    document.querySelector("#view-best-lift-button").addEventListener("click", showBestLift);
  });
  