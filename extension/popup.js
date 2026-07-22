document.addEventListener('DOMContentLoaded', () => {
  const statusDot = document.getElementById('status-dot');
  const statusText = document.getElementById('status-text');
  const loginSection = document.getElementById('login-section');
  const authSection = document.getElementById('auth-section');
  
  const tokenInput = document.getElementById('token-input');
  const saveTokenBtn = document.getElementById('save-token-btn');
  const logoutBtn = document.getElementById('logout-btn');

  // Check if token exists
  chrome.storage.local.get(['token'], (result) => {
    if (result.token) {
      showLoggedIn();
    } else {
      showLoggedOut();
    }
  });

  saveTokenBtn.addEventListener('click', () => {
    const token = tokenInput.value.trim();
    if (token) {
      chrome.storage.local.set({ token }, () => {
        showLoggedIn();
      });
    }
  });

  logoutBtn.addEventListener('click', () => {
    chrome.storage.local.remove(['token'], () => {
      showLoggedOut();
    });
  });

  function showLoggedIn() {
    statusDot.classList.add('active');
    statusText.textContent = 'Connected & Active';
    statusText.style.color = '#15803d';
    loginSection.style.display = 'none';
    authSection.style.display = 'block';
  }

  function showLoggedOut() {
    statusDot.classList.remove('active');
    statusText.textContent = 'Not Connected';
    statusText.style.color = '#991b1b';
    loginSection.style.display = 'block';
    authSection.style.display = 'none';
    tokenInput.value = '';
  }
});
