document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();

    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            document.getElementById(tabName).classList.add('active');
        });
    });

    // Save changes functionality
    const saveChangesButton = document.getElementById('saveChanges');
    saveChangesButton.addEventListener('click', () => {
        // Collect all form data
        const formData = {
            notifications: {
                email: document.getElementById('emailNotifications').checked,
                sms: document.getElementById('smsNotifications').checked,
                push: document.getElementById('pushNotifications').checked
            },
            security: {
                twoFactor: document.getElementById('twoFactor').value,
                sessionTimeout: document.getElementById('sessionTimeout').value
            },
            users: {
                defaultRole: document.getElementById('defaultRole').value,
                userRegistration: document.getElementById('userRegistration').value
            },
            system: {
                language: document.getElementById('systemLanguage').value,
                timeZone: document.getElementById('timeZone').value,
                dataRetention: document.getElementById('dataRetention').value
            },
            database: {
                backupFrequency: document.getElementById('backupFrequency').value,
                backupRetention: document.getElementById('backupRetention').value
            },
            alerts: {
                priority: document.getElementById('alertPriority').value,
                radius: document.getElementById('alertRadius').value,
                autoEscalation: document.getElementById('autoEscalation').value
            }
        };

        // Here you would typically send this data to your backend
        console.log('Saving changes:', formData);
        alert('Changes saved successfully!');
    });
});