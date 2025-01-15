/********************************************
  1) Adding and Removing Rows (Hotels, Activities)
********************************************/

/* HOTEL ROWS */
function addHotelRow() {
    const hotelTableBody = document.querySelector('.hotel-info table tbody');
    if (!hotelTableBody) return;

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td><input type="text" placeholder="Ingrese el nombre" required></td>
      <td><input type="text" placeholder="Ej. Doble, Suite" required></td>
      <td><input type="number" required></td>
      <td><input type="date" required> - <input type="date" required></td>
      <td><button class="remove-btn">X</button></td>
    `;
    hotelTableBody.appendChild(newRow);

    newRow.querySelector('.remove-btn').addEventListener('click', () => {
      hotelTableBody.removeChild(newRow);
    });
}

/* ITINERARY ROWS */
function addActivityRow() {
  const itineraryBody = document.querySelector('.itinerary table tbody');
  if (!itineraryBody) return;

  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td><input type="date" required></td>
    <td><input type="time" required></td>
    <td><input type="text" placeholder="Descripción" required></td>
    <td><button class="remove-btn">X</button></td>
  `;
  itineraryBody.appendChild(newRow);

  newRow.querySelector('.remove-btn').addEventListener('click', () => {
    itineraryBody.removeChild(newRow);
  });
}

/********************************************
  2) Attaching Event Listeners for "Agregar" Buttons
********************************************/
document.addEventListener('DOMContentLoaded', () => {
  const addHotelBtn = document.querySelector('[data-action="add-hotel"]');
  if (addHotelBtn) {
    addHotelBtn.addEventListener('click', addHotelRow);
  }

  const addActivityBtn = document.querySelector('[data-action="add-activity"]');
  if (addActivityBtn) {
    addActivityBtn.addEventListener('click', addActivityRow);
  }
});

/********************************************
  3) Summation of Service Costs (Base Fields Only)
********************************************/
document.addEventListener('DOMContentLoaded', () => {
  const alojamientoInput    = document.getElementById('costo-alojamiento');
  const trasladoInput       = document.getElementById('costo-traslado');
  const adicionalTotalInput = document.getElementById('costo-adicional-total');
  const totalServiciosInput = document.getElementById('total-servicios');

  if (!(alojamientoInput && trasladoInput && adicionalTotalInput && totalServiciosInput)) {
    return;
  }
  // Minimal placeholders, actual logic in section #5
  alojamientoInput.addEventListener('input', () => {});
  trasladoInput.addEventListener('input', () => {});
  adicionalTotalInput.addEventListener('input', () => {});
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

  function updateCurrencySymbols() {
    const selectedOption = currencySelect.options[currencySelect.selectedIndex];
    const symbol = selectedOption.getAttribute('data-symbol') || 'COP';

    currencySymbolSpan.textContent = symbol;
    if (currencyCotizacionSymbol)  currencyCotizacionSymbol.textContent  = symbol;
    if (currencyGananciasSymbol)   currencyGananciasSymbol.textContent   = symbol;
    if (currencyUtilidadSymbol)    currencyUtilidadSymbol.textContent    = symbol;
  }

  updateCurrencySymbols();
  currencySelect.addEventListener('change', updateCurrencySymbols);
});

/********************************************
 * 5) Quotation Calculation (Advanced + Tours)
********************************************/
document.addEventListener('DOMContentLoaded', () => {
  // "Precio interno" fields
  const alojamientoInput    = document.getElementById('costo-alojamiento');
  const trasladoInput       = document.getElementById('costo-traslado');
  const adicionalTotalInput = document.getElementById('costo-adicional-total');

  // "Precio de venta" fields
  const ventaAlojTrasInput  = document.getElementById('venta-alojamiento-traslado');
  const ventaAdicionalInput = document.getElementById('venta-adicional');

  // Tour checkboxes
  const tourDropdown   = document.getElementById('tour-dropdown');
  const tourCheckboxes = tourDropdown
    ? tourDropdown.querySelectorAll('input[type="checkbox"]')
    : [];

  // Summaries for "Costos del servicio"
  const totalServiciosInput = document.getElementById('total-servicios');  // sum interno
  const totalVentaUsdInput  = document.getElementById('total-venta-usd'); // sum venta -> /4000

  // Fields next to "Número de personas"
  const numeroPersonasInput   = document.getElementById('numero-personas');
  const precioInternoCopInput = document.getElementById('precio-interno-cop');
  const precioVentaCopInput   = document.getElementById('precio-venta-cop');

  // Fields from "Pagos y ganancias"
  const montoClienteInput    = document.getElementById('monto-cliente');
  const gananciasInput       = document.getElementById('ganancias');
  const utilidadPersonaInput = document.getElementById('utilidad-persona');

  // Skip if any crucial field is missing
  if (!(
    alojamientoInput && trasladoInput && adicionalTotalInput &&
    ventaAlojTrasInput && ventaAdicionalInput &&
    totalServiciosInput && totalVentaUsdInput &&
    numeroPersonasInput && precioInternoCopInput && precioVentaCopInput &&
    gananciasInput && utilidadPersonaInput
  )) {
    return;
  }

  // =========== Summation Functions ===========

  let lastInternoTotal = 0; // We'll store the internal total for Gains logic

  // (A) Interno
  function sumBaseInterno() {
    const aloVal = parseFloat(alojamientoInput.value) || 0;
    const traVal = parseFloat(trasladoInput.value) || 0;
    const adicVal = parseFloat(adicionalTotalInput.value) || 0;
    return aloVal + traVal + adicVal;
  }
  function sumToursInterno() {
    let total = 0;
    tourCheckboxes.forEach(checkbox => {
      if (checkbox.checked) {
        const internoVal = parseFloat(checkbox.getAttribute('data-price-interno')) || 0;
        total += internoVal;
      }
    });
    return total;
  }

  // (B) Venta
  function sumBaseVenta() {
    const ventAlojTras = parseFloat(ventaAlojTrasInput.value) || 0;
    const ventAdic     = parseFloat(ventaAdicionalInput.value) || 0;
    return ventAlojTras + ventAdic;
  }
  function sumToursVenta() {
    let total = 0;
    tourCheckboxes.forEach(checkbox => {
      if (checkbox.checked) {
        const ventaVal = parseFloat(checkbox.getAttribute('data-price-venta')) || 0;
        total += ventaVal;
      }
    });
    return total;
  }

  function calculateServiceTotals() {
    // 1) internal total
    const internoTotal = sumBaseInterno() + sumToursInterno();
    totalServiciosInput.value = internoTotal.toFixed(2);

    // 2) sale total => in USD
    const ventaTotal = sumBaseVenta() + sumToursVenta();
    const ventaUsd   = ventaTotal / 4000;
    totalVentaUsdInput.value = ventaUsd.toFixed(2);

    // store for Gains logic
    lastInternoTotal = internoTotal;

    return { internoTotal, ventaUsd };
  }

  function recalcQuotation() {
    const { internoTotal, ventaUsd } = calculateServiceTotals();

    const numPersons = parseFloat(numeroPersonasInput.value) || 0;

    // "Precio interno en COP" => internoTotal * # personas
    const internoCop = internoTotal * numPersons;
    precioInternoCopInput.value = internoCop.toFixed(2);

    // "Precio de venta en COP" => (ventaUsd * 4000) * # persons
    const ventaCop = ventaUsd * 4000 * numPersons;
    precioVentaCopInput.value = ventaCop.toFixed(2);

    recalcGains();
  }

  function recalcGains() {
    // Check if the 'monto-cliente' field exists; if not, skip or do alternate logic
    if (!montoClienteInput) {
      // We'll compute Gains as (Precio venta COP - Precio interno COP)
      const pVentaCop   = parseFloat(precioVentaCopInput.value) || 0;
      const pInternoCop = parseFloat(precioInternoCopInput.value) || 0;
      const gains       = pVentaCop - pInternoCop;
      gananciasInput.value = gains.toFixed(2);

      const numPersons  = parseFloat(numeroPersonasInput.value) || 0;
      utilidadPersonaInput.value = (numPersons > 0)
        ? (gains / numPersons).toFixed(2)
        : '0.00';
      return;
    }

    // If 'monto-cliente' DOES exist, use old logic
    const montoClienteVal = parseFloat(montoClienteInput.value) || 0;
    const numeroPers      = parseFloat(numeroPersonasInput.value) || 0;

    // Gains => (montoCliente - lastInternoTotal)
    const gains = montoClienteVal - lastInternoTotal;
    gananciasInput.value = gains.toFixed(2);

    // Utilidad/persona => Gains / # personas
    let utilidad = 0;
    if (numeroPers > 0) {
      utilidad = gains / numeroPers;
    }
    utilidadPersonaInput.value = utilidad.toFixed(2);
  }

  // =========== Event Listeners ===========

  // Internal cost changes
  alojamientoInput.addEventListener('input', recalcQuotation);
  trasladoInput.addEventListener('input', recalcQuotation);
  adicionalTotalInput.addEventListener('input', recalcQuotation);

  // Sale cost changes
  ventaAlojTrasInput.addEventListener('input', recalcQuotation);
  ventaAdicionalInput.addEventListener('input', recalcQuotation);

  // Tour checkboxes
  tourCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', recalcQuotation);
  });

  // Persons
  numeroPersonasInput.addEventListener('input', recalcQuotation);

  // Gains: attach only if it exists
  if (montoClienteInput) {
    montoClienteInput.addEventListener('input', recalcGains);
  }

  // Initialize
  recalcQuotation();
});
