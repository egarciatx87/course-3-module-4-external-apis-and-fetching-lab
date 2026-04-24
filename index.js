// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
// index.js

document.addEventListener("DOMContentLoaded", () => {
  // 1. SELECT THE ANCHORS
  const stateInput = document.getElementById('state-input');
  const fetchBtn = document.getElementById('fetch-alerts');
  const displayDiv = document.getElementById('alerts-display');
  const errorDiv = document.getElementById('error-message');

  // 2. THE TRIGGER (The Power Button)
  fetchBtn.addEventListener('click', async () => {
    const stateCode = stateInput.value.trim().toUpperCase();

    // RESET THE FIELD: Clean up before the new play
    errorDiv.classList.add('hidden');
    errorDiv.textContent = '';
    displayDiv.innerHTML = '';

    // GUARD CLAUSE: Handle empty input immediately
    if (!stateCode) {
      errorDiv.textContent = "Please enter a state abbreviation.";
      errorDiv.classList.remove('hidden');
      return;
    }

    // START THE FETCH
    await fetchWeatherAlerts(stateCode);
    
    // CLEAR INPUT: "Reset the brush" as required by the tests
    stateInput.value = '';
  });

  // 3. THE API HANDOFF
  async function fetchWeatherAlerts(state) {
    try {
      const response = await fetch(`https://api.weather.gov/alerts/active?area=${state}`);
      
      // If the API sends back a bad status (like 404), jump to catch
      if (!response.ok) {
        throw new Error('Network failure or invalid state code');
      }

      const data = await response.json();
      
      // Pass the data to the Builder
      displayAlerts(data);

    } catch (errorObject) {
      // 4. THE SAFETY NET
      errorDiv.textContent = `Error: ${errorObject.message}`;
      errorDiv.classList.remove('hidden');
    }
  }

  // 5. THE BUILDER (The Construction Crew)
  function displayAlerts(data) {
    const alerts = data.features;

    // Create the Summary Title
    const summary = document.createElement('h3');
    summary.textContent = `Weather Alerts: ${alerts.length}`;
    displayDiv.append(summary);

    // Create a list for headlines
    const ul = document.createElement('ul');

    alerts.forEach(alert => {
      const li = document.createElement('li');
      li.textContent = alert.properties.headline;
      ul.append(li);
    });

    displayDiv.append(ul);
  }
});