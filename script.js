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
            booksData = data
