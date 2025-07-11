document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const message = document.getElementById('loginMessage');

  const storedUser = localStorage.getItem(email);
  if (!storedUser) {
    message.style.color = 'red';
    message.textContent = 'User not found. Please register first.';
    return;
  }

  const user = JSON.parse(storedUser);
  if (user.password !== password) {
    message.style.color = 'red';
    message.textContent = 'Incorrect password.';
    return;
  }

  localStorage.setItem('loggedInUser', email);
  window.location.href = 'dashboard.html';
});
