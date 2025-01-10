/********************************************
  1) Adding and Removing Rows (Hotels, Activities)
********************************************/

/* HOTEL ROWS */
function addHotelRow() {
    // Select the table body in the "hotel-info" section
    const hotelTableBody = document.querySelector('.hotel-info table tbody');
    if (!hotelTableBody) return;
  
    // Create a new row
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td><input type="text" placeholder="Ingrese el nombre" required></td>
      <td><input type="text" placeholder="Ej. Doble, Suite" required></td>
      <td><input type="number" required></td>
      <td><input type="date" required> - <input type="date" required></td>
      <td><button class="remove-btn">X</button></td>
    `;
  
    // Append row
    hotelTableBody.appendChild(newRow);
  
    // Add remove functionality
    newRow.querySelector('.remove-btn').addEventListener('click', () => {
      hotelTableBody.removeChild(newRow);
    });
  }
  
  /* ITINERARY ROWS */
  function addActivityRow() {
    // Select the table body in the "itinerary" section
    const itineraryBody = document.querySelector('.itinerary table tbody');
    if (!itineraryBody) return;
  
    // Create a new row
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td><input type="date" required></td>
      <td><input type="time" required></td>
      <td><input type="text" placeholder="Descripción" required></td>
      <td><button class="remove-btn">X</button></td>
    `;
  
    // Append row
    itineraryBody.appendChild(newRow);
  
    // Add remove functionality
    newRow.querySelector('.remove-btn').addEventListener('click', () => {
      itineraryBody.removeChild(newRow);
    });
  }
  
  /********************************************
    2) Attaching Event Listeners for "Agregar" Buttons
  ********************************************/
  document.addEventListener('DOMContentLoaded', () => {
    // "Agregar hotel" button
    const addHotelBtn = document.querySelector('[data-action="add-hotel"]');
    if (addHotelBtn) {
      addHotelBtn.addEventListener('click', addHotelRow);
    }
  
    // "Agregar actividad" button
    const addActivityBtn = document.querySelector('[data-action="add-activity"]');
    if (addActivityBtn) {
      addActivityBtn.addEventListener('click', addActivityRow);
    }
  });
  
  /********************************************
    3) Summation of Service Costs
  ********************************************/
  document.addEventListener('DOMContentLoaded', () => {
    const alojamientoInput    = document.getElementById('costo-alojamiento');
    const trasladoInput       = document.getElementById('costo-traslado');
    const adicionalTotalInput = document.getElementById('costo-adicional-total');
    const totalServiciosInput = document.getElementById('total-servicios');
  
    if (!(alojamientoInput && trasladoInput && adicionalTotalInput && totalServiciosInput)) {
      return; // If these fields don’t exist, do nothing
    }
  
    function calculateTotal() {
      const alojamientoVal = parseFloat(alojamientoInput.value) || 0;
      const trasladoVal = parseFloat(trasladoInput.value) || 0;
      const adicionalVal = parseFloat(adicionalTotalInput.value) || 0;
      const sum = alojamientoVal + trasladoVal + adicionalVal;
  
      totalServiciosInput.value = sum.toFixed(2);
    }
  
    // Listen for inputs
    alojamientoInput.addEventListener('input', calculateTotal);
    trasladoInput.addEventListener('input', calculateTotal);
    adicionalTotalInput.addEventListener('input', calculateTotal);
  });
  
  /********************************************
    4) Currency Dropdown in "Costos del servicio"
  ********************************************/
  document.addEventListener('DOMContentLoaded', () => {
    const currencySelect     = document.getElementById('currency-select');
    const currencySymbolSpan = document.getElementById('currency-symbol');
  
    if (!(currencySelect && currencySymbolSpan)) {
      return; // If no currency dropdown, skip
    }
  
    currencySelect.addEventListener('change', () => {
      const selectedOption = currencySelect.options[currencySelect.selectedIndex];
      const symbol = selectedOption.getAttribute('data-symbol') || '$';
      currencySymbolSpan.textContent = symbol;
    });
  });
  