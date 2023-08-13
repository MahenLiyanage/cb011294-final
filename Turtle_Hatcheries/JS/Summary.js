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

// Retrieve stored form data from local storage
const storedFormData = localStorage.getItem('formData');
if (storedFormData) {
    const formData = JSON.parse(storedFormData);
    
    
    fullNameOutput.textContent = formData.fullName;
    mobileNumberOutput.textContent = formData.mobileNumber;
    emailOutput.textContent = formData.email;
    genderOutput.textContent = formData.gender;
} else {
   
    fullNameOutput.textContent = 'N/A';
    mobileNumberOutput.textContent = 'N/A';
    emailOutput.textContent = 'N/A';
    genderOutput.textContent = 'N/A';
}
});