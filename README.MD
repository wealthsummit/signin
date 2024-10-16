Creating a responsive web page with a form to collect user data and store it in Google Sheets involves several steps. Below is a simple example of HTML, CSS, and JavaScript code along with guidelines on how to set everything up.

### Step 1: Create the HTML Form

Here's a basic HTML structure with a responsive form.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Data Form</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>User Data Collection</h1>
        <form id="userDataForm">
            <label for="firstName">First Name:</label>
            <input type="text" id="firstName" required>

            <label for="surname">Surname:</label>
            <input type="text" id="surname" required>

            <label for="phoneNumber">Phone Number:</label>
            <input type="tel" id="phoneNumber" required>

            <label for="email">Email:</label>
            <input type="email" id="email" required>

            <label for="state">State:</label>
            <input type="text" id="state" required>

            <button type="submit">Submit</button>
        </form>
        <div id="responseMessage"></div>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

### Step 2: Add CSS for Responsiveness

Create a `styles.css` file to style your form.

```css
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
}

.container {
    width: 90%;
    max-width: 600px;
    margin: auto;
    background: white;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
    text-align: center;
}

form {
    display: flex;
    flex-direction: column;
}

label {
    margin-top: 10px;
}

input {
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button {
    margin-top: 20px;
    padding: 10px;
    border: none;
    background-color: #5cb85c;
    color: white;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #4cae4c;
}

#responseMessage {
    margin-top: 20px;
    text-align: center;
}
```

### Step 3: Write the JavaScript Code

In `script.js`, you'll write code to handle the form submission and send data to Google Sheets.

```javascript
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

    fetch('https://YOUR_GOOGLE_SCRIPT_URL', {
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
```

### Step 4: Set Up Google Sheets to Receive Data

1. **Create a Google Sheet**: Open Google Sheets and create a new sheet. Name it appropriately (e.g., "User Data").

2. **Create a Google Apps Script**:
   - Go to `Extensions > Apps Script`.
   - Delete any code in the script editor and replace it with the following:

   ```javascript
   function doPost(e) {
       var sheet = SpreadsheetApp.openById('YOUR_SHEET_ID').getActiveSheet();
       var data = JSON.parse(e.postData.contents);
       sheet.appendRow([data.firstName, data.surname, data.phoneNumber, data.email, data.state]);
       return ContentService.createTextOutput(JSON.stringify({result: 'success'})).setMimeType(ContentService.MimeType.JSON);
   }
   ```

   - Replace `YOUR_SHEET_ID` with the actual ID of your Google Sheet (the long string in the URL).
   - Save the project and deploy it as a web app: `Deploy > New deployment`. Select "Web app", set access to "Anyone", and click "Deploy".

3. **Copy the Web App URL**: After deployment, copy the URL of your web app and replace `https://YOUR_GOOGLE_SCRIPT_URL` in your `script.js` with this URL.

### Step 5: Test Your Application

1. Open your HTML file in a web browser.
2. Fill out the form and submit it.
3. Check your Google Sheet to see if the data has been recorded.

### Conclusion

This setup provides a simple way to collect user data through a responsive web form and store it in Google Sheets. You can further enhance the application by adding form validation and error handling as needed.
