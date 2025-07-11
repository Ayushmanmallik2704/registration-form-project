// script/register.js

console.log("✅ JS Loaded");

// Set DOB max to 18 years ago
const dobInput = document.getElementById('dob');
const today = new Date();
const yyyy = today.getFullYear() - 18;
const mm = String(today.getMonth() + 1).padStart(2, '0');
const dd = String(today.getDate()).padStart(2, '0');
dobInput.max = `${yyyy}-${mm}-${dd}`;

function showMsg(msg, color = 'red') {
  const message = document.getElementById('registerMessage');
  message.style.color = color;
  message.textContent = msg;
}

function is18Plus(date) {
  const dobDate = new Date(date);
  const today = new Date();
  const age = today.getFullYear() - dobDate.getFullYear();
  const m = today.getMonth() - dobDate.getMonth();
  return (age > 18 || (age === 18 && m >= 0));
}

document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();
  console.log("🟢 Form submission intercepted");

  const fullName = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const phone = document.getElementById('phone').value.trim();
  const gender = document.querySelector('input[name="gender"]:checked');
  const dob = document.getElementById('dob').value;
  const address = document.getElementById('address').value.trim();
  const city = document.getElementById('city').value;
  const skills = Array.from(document.querySelectorAll('input[name="skills"]:checked')).map(el => el.value);
  const terms = document.getElementById('terms').checked;

  console.log({ fullName, email, password, confirmPassword, phone, gender, dob, address, city, skills, terms });

  const namePattern = /^(?!.*(.)\1{2})[A-Za-z ]{3,}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!namePattern.test(fullName)) {
    console.log("❌ Full Name failed");
    return showMsg('Invalid full name.');
  }

  if (!emailPattern.test(email)) {
    console.log("❌ Email failed");
    return showMsg('Invalid email format.');
  }

  if (!passwordPattern.test(password)) {
    console.log("❌ Password failed");
    return showMsg('Password must be strong.');
  }

  if (password !== confirmPassword) {
    console.log("❌ Passwords do not match");
    return showMsg('Passwords do not match.');
  }

  if (!/^\d{10}$/.test(phone)) {
    console.log("❌ Phone failed");
    return showMsg('Phone must be 10 digits.');
  }

  if (!gender) {
    console.log("❌ Gender not selected");
    return showMsg('Please select gender.');
  }

  if (!is18Plus(dob)) {
    console.log("❌ DOB check failed");
    return showMsg('Must be at least 18 years old.');
  }

  if (address.length < 10) {
    console.log("❌ Address too short");
    return showMsg('Address must be 10+ chars.');
  }

  if (city === '') {
    console.log("❌ City not selected");
    return showMsg('Please select a city.');
  }

  if (skills.length === 0) {
    console.log("❌ No skills selected");
    return showMsg('Select at least one skill.');
  }

  if (!terms) {
    console.log("❌ Terms not accepted");
    return showMsg('You must accept terms.');
  }

  const user = {
    fullName,
    email,
    password,
    phone,
    gender: gender.value,
    dob,
    address,
    city,
    skills
  };

  localStorage.setItem(email, JSON.stringify(user));
  console.log("✅ Registration success");
  showMsg('Registered successfully! Redirecting to login...', 'green');
  document.getElementById('registerForm').reset();

  setTimeout(() => {
    window.location.href = 'login.html';
  }, 1500);
});
