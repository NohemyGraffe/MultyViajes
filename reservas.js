// reservas.js

// Function to add a new client row
function addClientRow() {
    const clientTableBody = document.querySelector('.client-table tbody'); // Select the tbody of the client table
    const newRow = document.createElement('tr'); // Create a new row

    // Add cells to the new row
    newRow.innerHTML = `
        <td><input type="text" placeholder="Ingrese nombre" required></td>
        <td><input type="text" placeholder="Ingrese pasaporte" required></td>
        <td><input type="email" placeholder="Ingrese correo" required></td>
        <td><input type="tel" placeholder="Ingrese teléfono" required></td>
        <td><button class="remove-btn">X</button></td> <!-- Add remove button -->
    `;

    // Append the new row to the table body
    clientTableBody.appendChild(newRow);

    // Add event listener for the "Remove" button
    newRow.querySelector('.remove-btn').addEventListener('click', function() {
        clientTableBody.removeChild(newRow); // Remove the row
    });
}

// Function to add a new hotel row
function addHotelRow() {
    const hotelTableBody = document.querySelector('.hotel-info table tbody'); // Select the tbody of the hotel table
    const newRow = document.createElement('tr'); // Create a new row

    // Add cells to the new row
    newRow.innerHTML = `
        <td><input type="text" placeholder="Ingrese el nombre" required></td>
        <td><input type="text" placeholder="Ej. Doble, Suite" required></td>
        <td><input type="number" required></td>
        <td><input type="date" required> - <input type="date" required></td>
        <td><button class="remove-btn">X</button></td> <!-- Add remove button -->
    `;

    // Append the new row to the table body
    hotelTableBody.appendChild(newRow);

    // Add event listener for the "Remove" button
    newRow.querySelector('.remove-btn').addEventListener('click', function() {
        hotelTableBody.removeChild(newRow); // Remove the row
    });
}

// Function to add a new activity row
function addActivityRow() {
    const itineraryTableBody = document.querySelector('.itinerary table tbody'); // Select the tbody of the itinerary table
    const newRow = document.createElement('tr'); // Create a new row

    // Add cells to the new row
    newRow.innerHTML = `
        <td><input type="date" required></td>
        <td><input type="time" required></td>
        <td><input type="text" placeholder="Descripción" required></td>
        <td><button class="remove-btn">X</button></td> <!-- Add remove button -->
    `;

    // Append the new row to the table body
    itineraryTableBody.appendChild(newRow);

    // Add event listener for the "Remove" button
    newRow.querySelector('.remove-btn').addEventListener('click', function() {
        itineraryTableBody.removeChild(newRow); // Remove the row
    });
}

// Event listeners for the buttons to trigger row addition
document.querySelector('[data-action="add-client"]').addEventListener('click', addClientRow);
document.querySelector('[data-action="add-hotel"]').addEventListener('click', addHotelRow);
document.querySelector('[data-action="add-activity"]').addEventListener('click', addActivityRow);
