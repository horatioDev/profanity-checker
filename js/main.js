// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

  // Get references to the button and result div elements
  const button = document.getElementById('checkButton');
  const resultDiv = document.getElementById('result');

  // Add a click event listener to the button
  button.addEventListener('click', function () {

    // Get the text input from the textarea
    const textInput = document.getElementById('textInput').value;

    // Call the checkForProfanity function to determine if profanity exists
    checkForProfanity(textInput)
      .then(hasProfanity => {
        // Display the appropriate message based on the profanity check result
        if (hasProfanity) {
          resultDiv.textContent = 'Profanity detected!';
          resultDiv.style.color = 'red';
        } else {
          resultDiv.textContent = 'No profanity detected.';
          resultDiv.style.color = 'green';
        }
      });
  });
});

// Function to check for profanity using an external API
function checkForProfanity(text) {

  // Make a fetch request to an API that checks for profanity
  return fetch(`https://www.purgomalum.com/service/json?text=${encodeURIComponent(text)}`)
    .then(res => res.json())
    .then(data => {
      // Log the API response data to the console
      console.log(data);

      // Update a paragraph element with the API's result (for demonstration purposes)
      document.querySelector('p').innerText = data.result;

      // Return a boolean indicating whether profanity was detected
      return data.result !== text;
    })
    .catch(err => {
      // Log any errors that occur during the fetch request
      console.log('Error detected: ', err);

      // Return false to indicate no profanity (or error) was detected
      return false;
    });
}
