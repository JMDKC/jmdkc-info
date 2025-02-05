// Helper to format date
function formatDate(date) {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  
  // Display limited rows
  function limitTableRows(tableBody, limit) {
    const rows = Array.from(tableBody.querySelectorAll("tr"));
    rows.forEach((row, index) => {
      row.style.display = index < limit ? "" : "none";
    });
  }
  
  function toggleSeeMore(button, tableBody) {
    if (!button || !tableBody) return;
  
    button.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent page jump
  
      const rows = tableBody.querySelectorAll("tr");
      const isExpanded = button.classList.toggle("expanded");
  
      button.textContent = isExpanded ? "See Less" : "See More";
  
      rows.forEach((row, index) => {
        row.style.display = isExpanded || index < 10 ? "" : "none";
      });
  
      // Scroll to the button for better UX
      button.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }
  
  // Table population helper
  function populateTable(url, tableSelector, buttonSelector, rowMapper, sortCallback) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const tableBody = document.querySelector(`${tableSelector} tbody`);
        if (!tableBody) return;
  
        tableBody.innerHTML = "";
  
        data.sort(sortCallback).forEach(rowMapper);
  
        limitTableRows(tableBody, 10);
  
        const seeMoreButton = document.querySelector(buttonSelector);
        if (seeMoreButton) toggleSeeMore(seeMoreButton, tableBody);
      })
      .catch((error) => console.error(`Error loading data for ${tableSelector}:`, error));
  }
  
  // Table population functions
  function populateBooksTable() {
    populateTable(
      "books.json",
      "#books-table",
      "#see-more-books",
      (book) => {
        document.querySelector("#books-table tbody").innerHTML += `
          <tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${formatDate(book.dateStarted)}</td>
            <td>${formatDate(book.dateFinished)}</td>
          </tr>
        `;
      },
      (a, b) => new Date(b.dateFinished) - new Date(a.dateFinished)
    );
  }
  
  function populateArtTable() {
    populateTable(
      "art.json",
      "#art-table",
      "#see-more-art",
      (art) => {
        document.querySelector("#art-table tbody").innerHTML += `
          <tr>
            <td>${art.title}</td>
            <td>${art.gallery}</td>
            <td>${formatDate(art.date)}</td>
          </tr>
        `;
      },
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  }
  
  function populateConcertsTable() {
    populateTable(
      "concerts.json",
      "#concerts-table",
      "#see-more-concerts",
      (concert) => {
        document.querySelector("#concerts-table tbody").innerHTML += `
          <tr>
            <td>${concert.title}</td>
            <td>${concert.composers}</td>
            <td>${concert.conductor}</td>
            <td>${concert.cast}</td>
            <td>${concert.venue}</td>
            <td>${formatDate(concert.date)}</td>
          </tr>
        `;
      },
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  }
  
  function populateWeightliftingTable() {
    populateTable(
      "comp-results.json",
      "#comp-results",
      "#see-more-weightlifting",
      (result) => {
        document.querySelector("#comp-results tbody").innerHTML += `
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
      },
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  }
  
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
  
    document.querySelector("#view-best-lift-button").addEventListener("click", showBestLift);
  });
  