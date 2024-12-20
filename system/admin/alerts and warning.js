const announcementRows = document.querySelectorAll('.announcement-row');
const itemsPerPage = 5;
let currentPage = 1;

function showPage(page) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  announcementRows.forEach((row, index) => {
    if (index >= startIndex && index < endIndex) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

// Function to get current weather
function getCurrentWeather(city) {
  const apiKey = 'dc198ef341b6539aab9b74f269c98aa1'; // Replace with your OpenWeatherMap API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  return fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const weatherInfo = {
        temperature: data.main.temp,
        description: data.weather[0].description,
        icon: data.weather[0].icon
      };
      return weatherInfo;
    })
    .catch(error => {
      console.error('Error fetching weather:', error);
      return null;
    });
}

// Add event listeners to pagination controls
const paginationLinks = document.querySelectorAll('.pagination .page-link');
paginationLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const page = parseInt(e.target.textContent);
    if (!isNaN(page)) {
      currentPage = page;
      showPage(currentPage);
    }
  });
});

// Initial page load
showPage(currentPage);

// Sidebar link functionality
const sidebarLinks = document.querySelectorAll('.sidebar .nav-link');
sidebarLinks.forEach(link => {
  link.addEventListener('click', () => {
    sidebarLinks.forEach(link => link.classList.remove('active'));
    link.classList.add('active');
  });
});

// Active alerts
const activeAlerts = document.getElementById('activeAlerts');
fetch('/api/active-alerts')
  .then(response => response.json())
  .then(alerts => {
    if (alerts.length === 0) {
      activeAlerts.innerHTML = '<li class="list-group-item">No active alerts</li>';
    } else {
      const alertItems = alerts.map(alert => `
        <li class="list-group-item">
          <h6>${alert.title}</h6>
          <p>${alert.description}</p>
        </li>
      `);
      activeAlerts.innerHTML = alertItems.join('');
      document.getElementById('alertCount').textContent = alerts.length;
    }
  })
  .catch(error => {
    activeAlerts.innerHTML = '<li class="list-group-item">Error loading active alerts</li>';
    console.error('Error:', error);
  });

// Recent incidents
const recentIncidents = document.getElementById('recentIncidents');
fetch('/api/recent-incidents')
  .then(response => response.json())
  .then(incidents => {
    if (incidents.length === 0) {
      recentIncidents.innerHTML = '<li class="list-group-item">No recent incidents</li>';
    } else {
      const incidentItems = incidents.map(incident => `
        <li class="list-group-item">
          <h6>${incident.title}</h6>
          <p>${incident.description}</p>
          <p>Location: ${incident.location}</p>
          <p>Reported at: ${new Date(incident.reportedAt).toLocaleString()}</p>
        </li>
      `);
      recentIncidents.innerHTML = incidentItems.join('');
    }
  })
  .catch(error => {
    recentIncidents.innerHTML = '<li class="list-group-item">Error loading recent incidents</li>';
    console.error('Error:', error);
  });

// Community requests
const communityRequests = document.getElementById('communityRequests');
fetch('/api/community-requests')
  .then(response => response.json())
  .then(requests => {
    if (requests.length === 0) {
      communityRequests.innerHTML = '<li class="list-group-item">No community requests</li>';
    } else {
      const requestItems = requests.map(request => `
        <li class="list-group-item">
          <h6>${request.title}</h6>
          <p>${request.description}</p>
          <p>Requested by: ${request.requestedBy}</p>
          <p>Status: ${request.status}</p>
        </li>
      `);
      communityRequests.innerHTML = requestItems.join('');
    }
  })
  .catch(error => {
    communityRequests.innerHTML = '<li class="list-group-item">Error loading community requests</li>';
    console.error('Error:', error);
  });

// Display current weather
const weatherContainer = document.getElementById('weather');
const city = 'YOUR_CITY'; // Replace with your city
getCurrentWeather(city)
  .then(weather => {
    if (weather) {
      const weatherHTML = `
        <div>
          <p>Temperature: ${weather.temperature}°C</p>
          <p>Description: ${weather.description}</p>
          <img src="http://openweathermap.org/img/w/${weather.icon}.png" alt="Weather Icon">
        </div>
      `;
      weatherContainer.innerHTML = weatherHTML;
    } else {
      weatherContainer.innerHTML = '<p>Error fetching weather</p>';
    }
  });
