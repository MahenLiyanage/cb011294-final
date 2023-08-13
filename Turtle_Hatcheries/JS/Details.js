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

// References to form elements
const fullNameInput = document.getElementById('fullName');
const mobileNumberInput = document.getElementById('mobileNumber');
const emailInput = document.getElementById('email');
const genderSelect = document.getElementById('gender');
const continueButton = document.getElementById('continueButton');

// Event listener for the continue button
continueButton.addEventListener('click', function () {
    // Get the values from the form
    const formData = {
        fullName: fullNameInput.value,
        mobileNumber: mobileNumberInput.value,
        email: emailInput.value,
        gender: genderInput.value
    };

    // Store form data in local storage
    localStorage.setItem('formData', JSON.stringify(formData));
});

    // Save form data to local storage
    const formData = {
        fullName: fullName,
        mobileNumber: mobileNumber,
        email: email,
        gender: gender
    };

    localStorage.setItem('formData', JSON.stringify(formData));

    
});

