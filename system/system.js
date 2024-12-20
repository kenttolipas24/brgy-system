// Get modal elements
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const loginBtn = document.querySelector('.log-in');
const signupBtn = document.querySelector('.sign-up');
const closeLogin = document.getElementById('closeLogin');
const closeSignup = document.getElementById('closeSignup');
const showSignup = document.getElementById('showSignup');
const showLogin = document.getElementById('showLogin');

// Event listeners for opening modals
loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
});

signupBtn.addEventListener('click', () => {
    signupModal.style.display = 'block';
});

// Event listeners for closing modals
closeLogin.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

closeSignup.addEventListener('click', () => {
    signupModal.style.display = 'none';
});

// Switch between login and signup
showSignup.addEventListener('click', () => {
    loginModal.style.display = 'none';
    signupModal.style.display = 'block';
});

showLogin.addEventListener('click', () => {
    signupModal.style.display = 'none';
    loginModal.style.display = 'block';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
    if (e.target === signupModal) {
        signupModal.style.display = 'none';
    }
});

// Predefined admin credentials (for demo purposes)
const adminCredentials = {
    email: "admin@example.com",
    password: "admin123"
};

// Login form submission handling
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Check if the user is an admin
    if (email === adminCredentials.email && password === adminCredentials.password) {
        // Redirect to the admin system
        window.location.href = "admin/admin.html"; // Replace with your admin system page
    } else {
        // Handle non-admin login
        alert("Login successful! Redirecting to user dashboard...");
        // Redirect to a user dashboard or homepage
        window.location.href = "system.html"; // Replace with the appropriate page
    }
});

