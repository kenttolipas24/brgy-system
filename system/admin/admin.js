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


// desaster dashboard 
// Add a new report
const addReportLink = document.querySelector('.sidebar-heading a');
addReportLink.addEventListener('click', (event) => {
  event.preventDefault();
  // adding a new report
  console.log('Add a new report clicked');
});

// Add event listener to the "Report Incident" button
submitReportBtn.addEventListener('click', () => {
  const incidentType = document.getElementById('incidentType').value;
  const incidentLocation = document.getElementById('incidentLocation').value;
  const incidentDescription = document.getElementById('incidentDescription').value;
  // Perform report submission functionality here
  console.log('Incident Type:', incidentType);
  console.log('Location:', incidentLocation);
  console.log('Description:', incidentDescription);
  // Reset the form
  document.getElementById('incidentType').value = '';
  document.getElementById('incidentLocation').value = '';
  document.getElementById('incidentDescription').value = '';
  // Close the modal
  $('#reportModal').modal('hide');
});


// Add event listener to the "Report Incident" button
// Add event listener to the "Report Incident" button
const submitReportBtn = document.getElementById('submitReport');
submitReportBtn.addEventListener('click', () => {
  const incidentType = document.getElementById('incidentType').value;
  const incidentLocation = document.getElementById('incidentLocation').value;
  const incidentDescription = document.getElementById('incidentDescription').value;

  // Perform report submission functionality here
  console.log('Incident Type:', incidentType);
  console.log('Location:', incidentLocation);
  console.log('Description:', incidentDescription);

  // Add the reported incident to the active incidents list
  const activeIncidentsList = document.getElementById('activeIncidentsList');
  const newIncidentItem = document.createElement('li');
  newIncidentItem.classList.add('list-group-item');
  newIncidentItem.textContent = `${incidentType} - ${incidentLocation}`;
  activeIncidentsList.appendChild(newIncidentItem);

  // Reset the form
  document.getElementById('incidentType').value = '';
  document.getElementById('incidentLocation').value = '';
  document.getElementById('incidentDescription').value = '';

  // Close the modal
  $('#reportModal').modal('hide');

  // Update the incident statistics chart
  updateIncidentStatsChart();

  // Add a recent alert
  addRecentAlert(`New ${incidentType} incident reported at ${incidentLocation}`);
});

// Initialize the incident map
const incidentMap = L.map('incidentMap').setView([51.505, -0.09], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(incidentMap);

// Add event listener to the "Share" button
const shareModal = document.getElementById('shareModal');
shareModal.addEventListener('shown.bs.modal', () => {
  // Implement share functionality here
  console.log('Share modal opened');
});

// Add event listener to the "Export" button
const exportModal = document.getElementById('exportModal');
exportModal.addEventListener('shown.bs.modal', () => {
  // Implement export functionality here
  console.log('Export modal opened');
});

// Add event listener to the "Apply Filter" button
const applyFilterBtn = document.getElementById('applyFilter');
applyFilterBtn.addEventListener('click', () => {
  const incidentTypeFilter = document.getElementById('incidentTypeFilter').value;
  const incidentLocationFilter = document.getElementById('incidentLocationFilter').value;

  // Filter the active incidents list based on the selected filters
  const activeIncidentsList = document.getElementById('activeIncidentsList');
  const incidentItems = activeIncidentsList.getElementsByClassName('list-group-item');
  for (let i = 0; i < incidentItems.length; i++) {
    const incidentItem = incidentItems[i];
    const incidentType = incidentItem.textContent.split(' - ')[0];
    const incidentLocation = incidentItem.textContent.split(' - ')[1];
    if (
      (incidentTypeFilter === '' || incidentType === incidentTypeFilter) &&
      (incidentLocationFilter === '' || incidentLocation.includes(incidentLocationFilter))
    ) {
      incidentItem.style.display = 'list-item';
    } else {
      incidentItem.style.display = 'none';
    }
  }

  // Close the modal
  $('#filterModal').modal('hide');
});

// Function to update the incident statistics chart
function updateIncidentStatsChart() {
  // Implement chart update logic here
  console.log('Updating incident statistics chart');
}

// Function to add a recent alert
function addRecentAlert(alertMessage) {
  const recentAlertsList = document.getElementById('recentAlertsList');
  const newAlertItem = document.createElement('li');
  newAlertItem.classList.add('list-group-item');
  newAlertItem.textContent = alertMessage;
  recentAlertsList.insertBefore(newAlertItem, recentAlertsList.firstChild);
}

// Sample disaster alerts data
const alerts = [
  {
    id: 1,
    title: "Typhoon Warning",
    date: "2023-05-01",
  },
  {
    id: 2,
    title: "Earthquake Alert",
    date: "2023-06-15",
  },
  {
    id: 3,
    title: "Flood Advisory",
    date: "2023-07-30",
  },
];

// Function to render alerts in the table
function renderAlerts() {
  const tableBody = document.getElementById("alertsTableBody");
  tableBody.innerHTML = "";

  alerts.forEach((alert) => {
    const row = document.createElement("tr");

    const idCell = document.createElement("td");
    idCell.textContent = alert.id;
    row.appendChild(idCell);

    const titleCell = document.createElement("td");
    titleCell.textContent = alert.title;
    row.appendChild(titleCell);

    const dateCell = document.createElement("td");
    dateCell.textContent = alert.date;
    row.appendChild(dateCell);

    const actionsCell = document.createElement("td");
    const viewButton = document.createElement("a");
    viewButton.href = "#";
    viewButton.classList.add("btn", "btn-sm", "btn-primary");
    viewButton.textContent = "View";
    actionsCell.appendChild(viewButton);
    row.appendChild(actionsCell);

    tableBody.appendChild(row);
  });
}

// Render alerts on page load
renderAlerts();


// Dummy data for demonstration purposes
const residents = [
  { id: 1, name: 'John Doe', address: '123 Main St', contact: '555-1234', status: 'Active' },
  { id: 2, name: 'Jane Smith', address: '456 Oak Ave', contact: '555-5678', status: 'Inactive' },
  { id: 3, name: 'Bob Johnson', address: '789 Elm St', contact: '555-9012', status: 'Active' },
];

const requests = [
  { id: 1, type: 'Food Assistance', requestedBy: 'John Doe', date: '2023-05-01', status: 'Pending', actions: ['Approve', 'Reject'] },
  { id: 2, type: 'Medical Assistance', requestedBy: 'Jane Smith', date: '2023-05-03', status: 'Approved', actions: ['Mark as Completed'] },
  { id: 3, type: 'Shelter Assistance', requestedBy: 'Bob Johnson', date: '2023-05-05', status: 'Rejected', actions: ['Resubmit'] },
];

const announcements = [
  { id: 1, title: 'Barangay Clean-up Drive', date: '2023-05-01', details: 'Join us for a community clean-up drive on May 1st.' },
  { id: 2, title: 'Community Sports Event', date: '2023-06-15', details: 'Participate in our annual community sports event on June 15th.' },
  { id: 3, title: 'Disaster Preparedness Seminar', date: '2023-08-10', details: 'Learn about disaster preparedness at our seminar on August 10th.' },
];

// Populate resident details
const residentTableBody = document.getElementById('residentTableBody');
const totalResidents = document.getElementById('totalResidents');
totalResidents.textContent = residents.length;

residents.forEach((resident, index) => {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${index + 1}</td>
    <td>${resident.name}</td>
    <td>${resident.address}</td>
    <td>${resident.contact}</td>
    <td>${resident.status}</td>
  `;
  residentTableBody.appendChild(row);
});

// Populate pending requests
const requestTableBody = document.getElementById('requestTableBody');
const pendingRequests = document.getElementById('pendingRequests');
pendingRequests.textContent = requests.filter(request => request.status === 'Pending').length;

requests.forEach((request, index) => {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${index + 1}</td>
    <td>${request.type}</td>
    <td>${request.requestedBy}</td>
    <td>${request.date}</td>
    <td>${request.status}</td>
    <td>
      ${request.actions.map(action => `<button class="btn btn-sm btn-primary">${action}</button>`).join('')}
    </td>
  `;
  requestTableBody.appendChild(row);
});

// Populate announcements
const announcementTableBody = document.getElementById('announcementTableBody');
announcements.forEach((announcement, index) => {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${index + 1}</td>
    <td>${announcement.title}</td>
    <td>${announcement.date}</td>
    <td>
      <button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#announcementModal" data-announcement-id="${announcement.id}">View</button>
      <button class="btn btn-sm btn-secondary" data-toggle="modal" data-target="#editAnnouncementModal" data-announcement-id="${announcement.id}">Edit</button>
      <button class="btn btn-sm btn-danger" data-toggle="modal" data-target="#deleteAnnouncementModal" data-announcement-id="${announcement.id}">Delete</button>
    </td>
  `;
  announcementTableBody.appendChild(row);
});

// Initialize tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

// Handle announcement modal
$('#announcementModal').on('show.bs.modal', function (event) {
  const button = $(event.relatedTarget);
  const announcementId = button.data('announcement-id');
  const announcement = announcements.find(a => a.id === announcementId);

  const modal = $(this);
  modal.find('#announcementTitle').text(announcement.title);
  modal.find('#announcementDate').text(announcement.date);
  modal.find('#announcementDetails').text(announcement.details);
});

// Handle edit announcement modal
$('#editAnnouncementModal').on('show.bs.modal', function (event) {
  const button = $(event.relatedTarget);
  const announcementId = button.data('announcement-id');
  const announcement = announcements.find(a => a.id === announcementId);

  const modal = $(this);
  modal.find('#editAnnouncementTitle').val(announcement.title);
  modal.find('#editAnnouncementDate').val(announcement.date);
  modal.find('#editAnnouncementDetails').val(announcement.details);
});

// Handle delete announcement modal
$('#deleteAnnouncementModal').on('show.bs.modal', function (event) {
  const button = $(event.relatedTarget);
  const announcementId = button.data('announcement-id');
  const announcement = announcements.find(a => a.id === announcementId);

  const modal = $(this);
  modal.find('#deleteAnnouncementTitle').text(announcement.title);
  modal.find('#deleteAnnouncementDate').text(announcement.date);
  modal.find('#deleteAnnouncementDetails').text(announcement.details);
});

// Handle save edited announcement
$('#saveEditedAnnouncementBtn').on('click', function () {
  const modal = $('#editAnnouncementModal');
  const announcementId = modal.find('#editAnnouncementId').val();
  const title = modal.find('#editAnnouncementTitle').val();
  const date = modal.find('#editAnnouncementDate').val();
  const details = modal.find('#editAnnouncementDetails').val();

  // Update the announcement data with the new values
  const announcement = announcements.find(a => a.id === parseInt(announcementId));
  announcement.title = title;
  announcement.date = date;
  announcement.details = details;

  // Update the announcement table row
  const row = $(`#announcementTableBody tr td:first-child:contains(${announcementId})`).parent();
  row.find('td:nth-child(2)').text(title);
  row.find('td:nth-child(3)').text(date);

  modal.modal('hide');
});

// Handle save new announcement
$('#saveNewAnnouncementBtn').on('click', function () {
  const modal = $('#addAnnouncementModal');
  const title = modal.find('#addAnnouncementTitle').val();
  const date = modal.find('#addAnnouncementDate').val();
  const details = modal.find('#addAnnouncementDetails').val();

  // Add the new announcement to the data
  const newAnnouncement = {
    id: announcements.length + 1,
    title,
    date,
    details,
  };
  announcements.push(newAnnouncement);

  // Add a new row to the announcement table
  const row = $('<tr>');
  row.html(`
    <td>${newAnnouncement.id}</td>
    <td>${newAnnouncement.title}</td>
    <td>${newAnnouncement.date}</td>
    <td>
      <button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#announcementModal" data-announcement-id="${newAnnouncement.id}">View</button>
      <button class="btn btn-sm btn-secondary" data-toggle="modal" data-target="#editAnnouncementModal" data-announcement-id="${newAnnouncement.id}">Edit</button>
      <button class="btn btn-sm btn-danger" data-toggle="modal" data-target="#deleteAnnouncementModal" data-announcement-id="${newAnnouncement.id}">Delete</button>
    </td>
  `);
  $('#announcementTableBody').append(row);

  modal.modal('hide');
});

// Handle delete announcement
$('#deleteAnnouncementBtn').on('click', function () {
  const modal = $('#deleteAnnouncementModal');
  const announcementId = modal.find('#deleteAnnouncementId').val();

  // Remove the announcement from the data
  const announcementIndex = announcements.findIndex(a => a.id === parseInt(announcementId));
  announcements.splice(announcementIndex, 1);

  // Remove the announcement row from the table
  const row = $(`#announcementTableBody tr td:first-child:contains(${announcementId})`).parent();
  row.remove();

  modal.modal('hide');
});

// Handle refresh icon click
$('.refresh-icon').on('click', function () {
  // Simulate data refresh by updating the values
  const newTotalResidents = Math.floor(Math.random() * 500) + 100;
  const newPendingRequests = Math.floor(Math.random() * 50);
  const newBudgetBalance = Math.floor(Math.random() * 1000000) + 100000;

  $('#totalResidents').text(newTotalResidents);
  $('#pendingRequests').text(newPendingRequests);
  $('#budgetBalance').text(`₱ ${newBudgetBalance.toLocaleString()}`);
});

