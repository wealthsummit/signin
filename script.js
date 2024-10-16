document.getElementById('userDataForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const surname = document.getElementById('surname').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const email = document.getElementById('email').value;
    const state = document.getElementById('state').value;

    const data = {
        firstName,
        surname,
        phoneNumber,
        email,
        state,
    };

    fetch('https://script.google.com/macros/s/AKfycbxfuWvPI0wlY6EO9JqSUbv40gV8kjgxWUooRQ2DFEtSdf14MWfHlz23Yeg3jGO8V6mgGQ/exec', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('responseMessage').innerText = 'Data submitted successfully!';
        document.getElementById('userDataForm').reset();
    })
    .catch((error) => {
        console.error('Error:', error);
        document.getElementById('responseMessage').innerText = 'Error submitting data.';
    });
});

