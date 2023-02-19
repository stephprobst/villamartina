// Retrieve the JSON data
fetch("config/prices.json")
  .then((response) => response.json())
  .then((data) => {
    // Create the table
    const table = document.getElementById("priceTable");
    const tbody = document.createElement("tbody");
    table.appendChild(tbody);

    // Add the table headers
    const headerRow = document.createElement("tr");
    headerRow.innerHTML = `
      <th>From</th>
      <th>Until</th>
      <th>Price per Night (EUR)</th>
    `;
    tbody.appendChild(headerRow);

    // Add the table rows
    for (const span of data) {
      const startDate = new Date(span.startDate);
      const endDate = new Date(span.endDate);

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${startDate.toLocaleDateString(undefined, {
          dateStyle: "medium",
        })}</td>
        <td>${endDate.toLocaleDateString(undefined, {
          dateStyle: "medium",
        })}</td>
        <td>${span.pricePerNight} EUR</td>
      `;
      tbody.appendChild(row);
    }
  });
