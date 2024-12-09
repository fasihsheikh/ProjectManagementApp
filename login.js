document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === "admin" && password === "admin123") {
    localStorage.setItem('userType', 'admin');
    window.location.href = 'admin-dashboard.html';
  } else if (["employee1", "employee2", "employee3"].includes(username) && password === "employee123") {
    localStorage.setItem('userType', 'employee');
    localStorage.setItem('username', username);
    window.location.href = 'employee-dashboard.html';
  } else {
    alert('Invalid credentials');
  }
});
