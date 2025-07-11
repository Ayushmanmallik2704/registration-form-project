const email = localStorage.getItem('loggedInUser');
    const detailsContainer = document.getElementById('userDetails');

    if (!email || !localStorage.getItem(email)) {
      alert('You must be logged in to view this page.');
      window.location.href = 'login.html';
    } else {
      const user = JSON.parse(localStorage.getItem(email));
      const detailHTML = `
        <p><strong>Name:</strong> ${user.fullName}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Phone:</strong> ${user.phone}</p>
        <p><strong>Gender:</strong> ${user.gender}</p>
        <p><strong>DOB:</strong> ${user.dob}</p>
        <p><strong>Address:</strong> ${user.address}</p>
        <p><strong>City:</strong> ${user.city}</p>
        <p><strong>Skills:</strong> ${user.skills.join(', ')}</p>
      `;
      detailsContainer.innerHTML = detailHTML;
    }

    document.getElementById('logoutBtn').addEventListener('click', () => {
      localStorage.removeItem('loggedInUser');
      window.location.href = 'index.html';
    });