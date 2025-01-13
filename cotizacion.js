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
        const currencySelect           = document.getElementById('currency-select');
        const currencySymbolSpan       = document.getElementById('currency-symbol');
        const currencyCotizacionSymbol = document.getElementById('currency-cotizacion-symbol');
        const currencyGananciasSymbol  = document.getElementById('currency-ganancias-symbol');
        const currencyUtilidadSymbol   = document.getElementById('currency-utilidad-symbol');
      
        // Function to update all currency symbols
        function updateCurrencySymbols() {
          const selectedOption = currencySelect.options[currencySelect.selectedIndex];
          const symbol = selectedOption.getAttribute('data-symbol') || 'COP';
      
          currencySymbolSpan.textContent = symbol;
          if (currencyCotizacionSymbol) {
            currencyCotizacionSymbol.textContent = symbol;
          }
          if (currencyGananciasSymbol) {
            currencyGananciasSymbol.textContent = symbol;
          }
          if (currencyUtilidadSymbol) {
            currencyUtilidadSymbol.textContent = symbol;
          }
        }
      
        // Set default symbols to COP on page load
        updateCurrencySymbols();
      
        // Update symbols when currency changes
        currencySelect.addEventListener('change', updateCurrencySymbols);
      });
      
  
  /********************************************
   *  5) Quotation Calculation 
  ********************************************/
  document.addEventListener('DOMContentLoaded', () => {
    // Fields from "Costos del servicio"
    const alojamientoInput     = document.getElementById('costo-alojamiento');
    const trasladoInput        = document.getElementById('costo-traslado');
    const adicionalTotalInput  = document.getElementById('costo-adicional-total');
    const totalServiciosInput  = document.getElementById('total-servicios');
  
    // Fields from "Cálculo de cotización"
    const numeroPersonasInput   = document.getElementById('numero-personas');
    const precioPorPersonaInput = document.getElementById('precio-por-persona');
    const montoCotizacionInput  = document.getElementById('monto-cotizacion');
  
    // NEW: Fields from "Pagos y ganancias"
    const montoClienteInput      = document.getElementById('monto-cliente');
    const gananciasInput         = document.getElementById('ganancias');
    const utilidadPersonaInput   = document.getElementById('utilidad-persona');
  
    // If any are missing, skip
    if (!(
      alojamientoInput &&
      trasladoInput &&
      adicionalTotalInput &&
      totalServiciosInput &&
      numeroPersonasInput &&
      precioPorPersonaInput &&
      montoCotizacionInput &&
      montoClienteInput &&
      gananciasInput &&
      utilidadPersonaInput
    )) {
      return;
    }
  
    // Calculate total cost of service (alojamiento + traslado + adicional)
    function calculateServiceTotal() {
      const alojamientoVal = parseFloat(alojamientoInput.value) || 0;
      const trasladoVal    = parseFloat(trasladoInput.value) || 0;
      const adicionalVal   = parseFloat(adicionalTotalInput.value) || 0;
      const sum = alojamientoVal + trasladoVal + adicionalVal;
  
      totalServiciosInput.value = sum.toFixed(2);
      return sum;
    }
  
    // Recalculate quotation: 
    // "Precio por persona" + "Monto cotizacion" from service total
    function recalcQuotation() {
      const totalServicios = calculateServiceTotal();
  
      const numeroPersonas = parseFloat(numeroPersonasInput.value) || 0;
      let precioPorPersona = 0;
  
      if (numeroPersonas > 0) {
        precioPorPersona = totalServicios / numeroPersonas;
      }
      precioPorPersonaInput.value = precioPorPersona.toFixed(2);
  
      // Monto cotizacion = totalServicios
      montoCotizacionInput.value = totalServicios.toFixed(2);
  
      // After updating Monto cotizacion, recalc Gains
      recalcGains();
    }
  
    // NEW: Recalculate Gains + Utilidad/persona
    function recalcGains() {
      const montoClienteVal    = parseFloat(montoClienteInput.value) || 0;
      const montoCotizacionVal = parseFloat(montoCotizacionInput.value) || 0;
      const numeroPersonas     = parseFloat(numeroPersonasInput.value) || 0;
  
      // Ganancias => (montoCliente - montoCotizacion)
      const gains = montoClienteVal - montoCotizacionVal;
      gananciasInput.value = gains.toFixed(2);
  
      // Utilidad/persona => Ganancias / # personas
      let utilidadPersona = 0;
      if (numeroPersonas > 0) {
        utilidadPersona = gains / numeroPersonas;
      }
      utilidadPersonaInput.value = utilidadPersona.toFixed(2);
    }
  
    // Attach event listeners
    // 1) Service cost fields => recalc Quotation
    alojamientoInput.addEventListener('input', recalcQuotation);
    trasladoInput.addEventListener('input', recalcQuotation);
    adicionalTotalInput.addEventListener('input', recalcQuotation);
  
    // 2) "Número de personas" => recalc Quotation
    numeroPersonasInput.addEventListener('input', recalcQuotation);
  
    // 3) "Monto pagado por el cliente" => recalc Gains directly
    montoClienteInput.addEventListener('input', recalcGains);
  
    // Init on page load
    recalcQuotation();
  });
  
  
