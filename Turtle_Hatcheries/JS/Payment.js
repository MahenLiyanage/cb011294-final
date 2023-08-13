document.addEventListener('DOMContentLoaded', function() {
    // Retrieve data from local storage
    const summaryData = JSON.parse(localStorage.getItem('summaryData'));

    if (summaryData) {
        document.getElementById('dateInTable').textContent = summaryData.date;
        document.getElementById('timeInTable').textContent = summaryData.time;
        document.getElementById('durationInTime').textContent = summaryData.duration;
        document.getElementById('ticketsInTable').textContent = summaryData.tickets;
        document.getElementById('totalPayableInTable').textContent = summaryData.totalPayable;
    }
    
    const cardNumberInput = document.querySelector('input[placeholder="Your card number"]');
    const expiryDateInput = document.querySelector('input[placeholder="MM/YY"]');
    const cvvInput = document.querySelector('input[placeholder="Enter CVC/CVV number"]');
    const cardholderNameInput = document.querySelector('input[placeholder="Enter cardholder\'s name"]');
    const payButton = document.querySelector('.button3');
    const summaryTable = document.querySelector('.BookingSummary');

    // Form validation function
    function validateForm() {
        const cardNumber = cardNumberInput.value;
        const expiryDate = expiryDateInput.value;
        const cvv = cvvInput.value;
        const cardholderName = cardholderNameInput.value;

        return cardNumberRegex.test(cardNumber) &&
            expiryDateRegex.test(expiryDate) &&
            cvvRegex.test(cvv) &&
            cardholderName !== "";
    }

    payButton.addEventListener('click', function (event) {
        event.preventDefault(); 
        if (validateForm()) {
            // Save payment information to local storage
            localStorage.setItem('cardNumber', cardNumberInput.value);
            localStorage.setItem('expiryDate', expiryDateInput.value);
            localStorage.setItem('cvv', cvvInput.value);
            localStorage.setItem('cardholderName', cardholderNameInput.value);

            // Redirect to the summary page
            window.location.href = '../Pages/Summary.html'; 
        }
    });

});

   
