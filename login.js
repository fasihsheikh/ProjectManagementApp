const ADMIN_USERNAME = 'Fasih';
const ADMIN_PASSWORD = 'admin123';

function adminLogin() {
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        localStorage.setItem('userType', 'admin');
        window.location.href = 'admin-dashboard.html';
    } else {
        alert('Invalid Admin Credentials');
    }
}

function employeeLogin() {
    const username = document.getElementById('employeeUsername').value;
    const password = document.getElementById('employeePassword').value;

    if (username && password) {
        localStorage.setItem('userType', 'employee');
        localStorage.setItem('employeeUsername', username);
        window.location.href = 'employee-dashboard.html';
    } else {
        alert('Please enter username and password');
    }
}