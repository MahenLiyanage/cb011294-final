// References
const dateInput = document.querySelector('.dateF');
const adultSLInput = document.querySelector('.sl_adult');
const childSLInput = document.querySelector('.sl_child');
const adultForeignInput = document.querySelector('.foreign_adult');
const childForeignInput = document.querySelector('.foreign_child');
const infantInput = document.querySelector('.infant');
const timeSlotsSelect = document.querySelector('.dropdown');
const bookingSummaryTable = document.querySelector('.BookingSummary');
 const continueButton = document.getElementById('continueButton');
 const continueLink = document.getElementById('continueLink');


// Event Listeners 
dateInput.addEventListener('change', updateSummary);
adultSLInput.addEventListener('input', updateSummary);
childSLInput.addEventListener('input', updateSummary);
adultForeignInput.addEventListener('input', updateSummary);
childForeignInput.addEventListener('input', updateSummary);
infantInput.addEventListener('input', updateSummary);
timeSlotsSelect.addEventListener('change', updateSummary);

function updateSummary() {
    const selectedDate = dateInput.value;
    const selectedTimeSlots = Array.from(timeSlotsSelect.selectedOptions, option => option.text);
    const totalAdults = parseInt(adultSLInput.value) + parseInt(adultForeignInput.value);
    const totalChildren = parseInt(childSLInput.value) + parseInt(childForeignInput.value);
    const totalInfants = parseInt(infantInput.value);
    const totalTickets = totalAdults + totalChildren + totalInfants;

    // Total Charge
    let totalCharge = 0;
    selectedTimeSlots.forEach(timeSlot => {
        totalCharge += calculateCharge(timeSlot, totalAdults, totalChildren);
    });

    // Summary table
    bookingSummaryTable.rows[0].cells[1].textContent = selectedDate;
    bookingSummaryTable.rows[1].cells[1].textContent = selectedTimeSlots.join(', ');
    bookingSummaryTable.rows[2].cells[1].textContent = `${selectedTimeSlots.length} hr(s)`;
    
    let ticketDetails = '';
    if (totalAdults > 0) ticketDetails += `${totalAdults} Adult(s), `;
    if (totalChildren > 0) ticketDetails += `${totalChildren} Child(ren), `;
    if (totalInfants > 0) ticketDetails += `${totalInfants} Infant(s), `;
    ticketDetails = ticketDetails.slice(0, -2); 
    bookingSummaryTable.rows[3].cells[1].textContent = ticketDetails;

    bookingSummaryTable.rows[4].cells[1].textContent = `$${totalCharge}`;

    // Store details and summary table in local storage
    const summaryData = {
        date: selectedDate,
        time: selectedTimeSlots.join(', '),
        duration: `${selectedTimeSlots.length} hr(s)`,
        tickets: ticketDetails,
        totalPayable: `$${totalCharge}`
    };

    localStorage.setItem('summaryData', JSON.stringify(summaryData));
    const isValidForm = selectedDate && totalTickets > 0 && selectedTimeSlots.length > 0;
    continueButton.disabled = !isValidForm;
}


function calculateCharge(timeSlot, adults, children) {
    const peakHours = ['10.00 am - 11.00 am (Peak)', '11.00 am - 12.00 pm (Peak)', '12.00 pm - 1.00 pm (Peak)', '3.00 pm - 4.00 pm (Peak)', '4.00 pm - 5.00 pm (Peak)', '5.00 pm - 6.00 pm (peak)'];
    const normalSLAdultPrice = 4;
    const peakSLAdultPrice = 6;
    const normalSLChildPrice = 2;
    const peakSLChildPrice = 3;
    const normalForeignAdultPrice = 10;
    const peakForeignAdultPrice = 13;
    const normalForeignChildPrice = 5;
    const peakForeignChildPrice = 8;

    const isPeak = peakHours.includes(timeSlot);
    const adultPrice = isPeak ? peakSLAdultPrice : normalSLAdultPrice;
    const childPrice = isPeak ? peakSLChildPrice : normalSLChildPrice;

    return adults * adultPrice + children * childPrice;
}

// Disable past dates in the date picker
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

// Validity checker

function checkFormValidity() {
    const isValidDate = dateInput.validity.valid && new Date(dateInput.value) > new Date();
    const isValidTickets = (adultSLInput.value > 0 || childSLInput.value > 0 || adultForeignInput.value > 0 || childForeignInput.value > 0 || infantInput.value > 0);
    const isValidTimeSlots = timeSlotsSelect.selectedOptions.length > 0;

    return isValidDate && isValidTickets && isValidTimeSlots;
}


dateInput.addEventListener('input', checkValidity);
adultSLInput.addEventListener('input', checkValidity);
childSLInput.addEventListener('input', checkValidity);
adultForeignInput.addEventListener('input', checkValidity);
childForeignInput.addEventListener('input', checkValidity);
infantInput.addEventListener('input', checkValidity);
timeSlotsSelect.addEventListener('change', checkValidity);

checkValidity();

continueButton.disabled = !isValidForm;

            // Update link behavior
            if (isValidForm) {
                continueLink.removeAttribute('disabled');
                continueLink.style.pointerEvents = 'auto';
            } else {
                continueLink.setAttribute('disabled', 'disabled');
                continueLink.style.pointerEvents = 'none';
            }
        

continueLink.addEventListener('click', function (event) {
    if (!isValidForm) {
        event.preventDefault(); 
    }
});
