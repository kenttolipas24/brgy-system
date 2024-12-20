document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Form submission handlers
    const generalForm = document.getElementById('generalForm');
    const securityForm = document.getElementById('securityForm');

    generalForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you would typically send the form data to a server
        alert('General information updated successfully!');
    });

    securityForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (newPassword !== confirmPassword) {
            alert('New passwords do not match!');
            return;
        }

        // Here you would typically send the form data to a server
        alert('Password updated successfully!');
    });

    // Populate activity log
    const activityLog = document.getElementById('activityLog');
    const activities = [
        {
            action: "System Login",
            timestamp: "2024-12-17 10:30 AM",
            details: "Logged in from 192.168.1.1"
        },
        {
            action: "Profile Update",
            timestamp: "2024-12-16 3:45 PM",
            details: "Updated contact information"
        },
        {
            action: "Password Change",
            timestamp: "2024-12-15 2:15 PM",
            details: "Changed account password"
        }
    ];

    activities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <div class="activity-header">
                <span class="activity-action">${activity.action}</span>
                <span class="activity-timestamp">${activity.timestamp}</span>
            </div>
            <div class="activity-details">${activity.details}</div>
        `;
        activityLog.appendChild(activityItem);
    });
});

