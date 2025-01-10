// reservas.js

// 1) Function to add a new client row



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

// 2) Function to add a new hotel row


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


// 3) Function to add a new row to the vuelos table


function addFlightRow() {
    const vuelosTableBody = document.querySelector('.vuelos table tbody'); // Select the tbody of the vuelos table
    const newRow = document.createElement('tr'); // Create a new row

    // Add cells to the new row
    newRow.innerHTML = `
        <td><input type="date" required></td>
        <td><input type="time" required></td>
        <td><input type="text" placeholder="Número de vuelo" required></td>
        <td><button class="remove-btn">X</button></td> <!-- Dynamically added remove button -->
    `;

    // Append the new row to the table body
    vuelosTableBody.appendChild(newRow);

    // Add event listener for the "Remove" button
    newRow.querySelector('.remove-btn').addEventListener('click', function() {
        vuelosTableBody.removeChild(newRow); // Remove the row
    });
}

// Event listener for the "Agregar vuelo" button to trigger row addition
document.querySelector('[data-action="add-flight"]').addEventListener('click', addFlightRow);


// 4) Function to add a new activity row


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


/* 5) Functionality for the "Tipo de cliente" droppdown*/

document.addEventListener('DOMContentLoaded', () => {
    const clientTypeDropdown = document.querySelector('#client-type');
    const clientTypeFields = document.querySelector('.client-type-fields');

    // Define a function to update fields based on the selected value
    function updateClientTypeFields(selectedValue) {
        // Always clear existing fields first
        clientTypeFields.innerHTML = '';

        // If the selected value is empty (e.g., "Seleccionar tipo de cliente"), do nothing
        if (!selectedValue) {
            return;
        }

        if (selectedValue === 'agencia') {
            // Create one input for "Nombre de agencia"
            const agenciaLabel = document.createElement('label');
            agenciaLabel.textContent = 'Nombre de la agencia';
            const agenciaInput = document.createElement('input');
            agenciaInput.type = 'text';
            agenciaInput.placeholder = 'Ingrese el nombre de la agencia';
            agenciaInput.required = true;

            clientTypeFields.appendChild(agenciaLabel);
            clientTypeFields.appendChild(agenciaInput);

        } else if (selectedValue === 'particular') {
            // Create two inputs: "Nombre de la persona que realiza la reserva" and "Contacto"
            const personaLabel = document.createElement('label');
            personaLabel.textContent = 'Nombre de la persona que realiza la reserva ';
            const personaInput = document.createElement('input');
            personaInput.type = 'text';
            personaInput.placeholder = 'Ingrese el nombre de la persona';
            personaInput.required = true;

            const contactoLabel = document.createElement('label');
            contactoLabel.textContent = 'Contacto ';
            const contactoInput = document.createElement('input');
            contactoInput.type = 'text';
            contactoInput.placeholder = 'Ingrese el contacto';
            contactoInput.required = true;

            clientTypeFields.appendChild(personaLabel);
            clientTypeFields.appendChild(personaInput);
            clientTypeFields.appendChild(contactoLabel);
            clientTypeFields.appendChild(contactoInput);
        }
    }

    // Attach an event listener for dropdown changes
    clientTypeDropdown.addEventListener('change', () => {
        updateClientTypeFields(clientTypeDropdown.value);
    });

    // Also call it once on page load, in case there's a pre-selected value
    // If your placeholder is selected by default (value=""), this will simply do nothing
    updateClientTypeFields(clientTypeDropdown.value);
});

/* 6)Function to sum all the Service costs*/

document.addEventListener('DOMContentLoaded', () => {
  const alojamientoInput = document.getElementById('costo-alojamiento');
  const trasladoInput = document.getElementById('costo-traslado');
  const adicionalTotalInput = document.getElementById('costo-adicional-total');
  const totalServiciosInput = document.getElementById('total-servicios');

  function calculateTotal() {
    // Parse input values as numbers. Use 0 if not a valid number.
    const alojamiento = parseFloat(alojamientoInput.value) || 0;
    const traslado = parseFloat(trasladoInput.value) || 0;
    const adicionalTotal = parseFloat(adicionalTotalInput.value) || 0;

    const sum = alojamiento + traslado + adicionalTotal;
    totalServiciosInput.value = sum.toFixed(2); // Display with two decimals if you want
  }

  // Listen to input events on each relevant field
  alojamientoInput.addEventListener('input', calculateTotal);
  trasladoInput.addEventListener('input', calculateTotal);
  adicionalTotalInput.addEventListener('input', calculateTotal);
});


/* 7) Styling the Currency dropdown menu*/

document.addEventListener('DOMContentLoaded', () => {
    const alojamientoInput = document.getElementById('costo-alojamiento');
    const trasladoInput = document.getElementById('costo-traslado');
    const adicionalTotalInput = document.getElementById('costo-adicional-total');
    const totalServiciosInput = document.getElementById('total-servicios');
    const currencySelect = document.getElementById('currency-select');
    const currencySymbolSpan = document.getElementById('currency-symbol');
  
    function calculateTotal() {
      const alojamiento = parseFloat(alojamientoInput.value) || 0;
      const traslado = parseFloat(trasladoInput.value) || 0;
      const adicionalTotal = parseFloat(adicionalTotalInput.value) || 0;
  
      const sum = alojamiento + traslado + adicionalTotal;
      totalServiciosInput.value = sum.toFixed(2);
    }
  
    alojamientoInput.addEventListener('input', calculateTotal);
    trasladoInput.addEventListener('input', calculateTotal);
    adicionalTotalInput.addEventListener('input', calculateTotal);
  
    // Update currency symbol when currency changes
    currencySelect.addEventListener('change', () => {
      const selectedOption = currencySelect.options[currencySelect.selectedIndex];
      const symbol = selectedOption.getAttribute('data-symbol');
      currencySymbolSpan.textContent = symbol;
    });
  });
  
