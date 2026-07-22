// Detect if we have stored credentials for this page
const detectAndAutofill = () => {
  const url = window.location.href;
  
  chrome.runtime.sendMessage({ action: 'fetchCredentials', url }, (response) => {
    if (response && response.success && response.data && response.data.length > 0) {
      const credentials = response.data[0]; // Take the first match
      
      // Look for password fields
      const passwordInputs = document.querySelectorAll('input[type="password"]');
      if (passwordInputs.length > 0) {
        const pwField = passwordInputs[0];
        
        // Very basic heuristic for username/email field (usually the text/email field right before password)
        const form = pwField.closest('form');
        let userField = null;
        
        if (form) {
          userField = form.querySelector('input[type="text"], input[type="email"]');
        }

        // Show prompt to autofill
        showAutofillPrompt(credentials, userField, pwField);
      }
    }
  });
};

const showAutofillPrompt = (credentials, userField, pwField) => {
  // Avoid duplicate prompts
  if (document.getElementById('notelock-autofill-prompt')) return;

  const prompt = document.createElement('div');
  prompt.id = 'notelock-autofill-prompt';
  prompt.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 999999;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    padding: 16px;
    font-family: system-ui, sans-serif;
    width: 300px;
  `;

  prompt.innerHTML = `
    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
      <div style="background: #eef2ff; color: #4f46e5; padding: 4px; border-radius: 4px; font-weight: bold;">NL</div>
      <span style="font-weight: 600; color: #111827;">NoteLock Autofill</span>
    </div>
    <p style="font-size: 14px; color: #4b5563; margin-bottom: 16px;">
      Fill credentials for <strong>${credentials.username}</strong>?
    </p>
    <div style="display: flex; gap: 8px;">
      <button id="nl-autofill-btn" style="flex: 1; background: #4f46e5; color: white; border: none; padding: 8px; border-radius: 6px; cursor: pointer; font-weight: 500;">Autofill</button>
      <button id="nl-cancel-btn" style="flex: 1; background: white; color: #4b5563; border: 1px solid #d1d5db; padding: 8px; border-radius: 6px; cursor: pointer; font-weight: 500;">Cancel</button>
    </div>
  `;

  document.body.appendChild(prompt);

  document.getElementById('nl-autofill-btn').addEventListener('click', () => {
    if (userField && credentials.username) {
      userField.value = credentials.username || credentials.email;
      userField.dispatchEvent(new Event('input', { bubbles: true }));
    }
    if (pwField && credentials.password) {
      pwField.value = credentials.password;
      pwField.dispatchEvent(new Event('input', { bubbles: true }));
    }
    prompt.remove();
  });

  document.getElementById('nl-cancel-btn').addEventListener('click', () => {
    prompt.remove();
  });
};


// Intercept form submissions to save new credentials
const interceptSubmissions = () => {
  document.addEventListener('submit', (e) => {
    const form = e.target;
    const passwordInput = form.querySelector('input[type="password"]');
    
    if (passwordInput && passwordInput.value) {
      const usernameInput = form.querySelector('input[type="text"], input[type="email"]');
      
      const username = usernameInput ? usernameInput.value : '';
      const password = passwordInput.value;
      const url = window.location.href;
      const websiteName = window.location.hostname;

      if (password) {
        // Prevent default briefly? For simplicity we just show prompt asynchronously,
        // though form might navigate away. In a real extension, we might intercept earlier.
        // For this demo, we save it in local storage temporarily.
        chrome.storage.local.set({ 
          pendingSave: { websiteName, url, username, password } 
        });
      }
    }
  }, true);
};

// Check if there's a pending save (if form submitted and page reloaded)
const checkPendingSave = () => {
  chrome.storage.local.get(['pendingSave'], (result) => {
    if (result.pendingSave) {
      showSavePrompt(result.pendingSave);
    }
  });
};

const showSavePrompt = (data) => {
  if (document.getElementById('notelock-save-prompt')) return;

  const prompt = document.createElement('div');
  prompt.id = 'notelock-save-prompt';
  prompt.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 999999;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    padding: 16px;
    font-family: system-ui, sans-serif;
    width: 300px;
  `;

  prompt.innerHTML = `
    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
      <div style="background: #eef2ff; color: #4f46e5; padding: 4px; border-radius: 4px; font-weight: bold;">NL</div>
      <span style="font-weight: 600; color: #111827;">Save to NoteLock?</span>
    </div>
    <p style="font-size: 14px; color: #4b5563; margin-bottom: 16px;">
      Do you want to save the password for <strong>${data.websiteName}</strong>?
    </p>
    <div style="display: flex; gap: 8px;">
      <button id="nl-save-btn" style="flex: 1; background: #4f46e5; color: white; border: none; padding: 8px; border-radius: 6px; cursor: pointer; font-weight: 500;">Save</button>
      <button id="nl-ignore-btn" style="flex: 1; background: white; color: #4b5563; border: 1px solid #d1d5db; padding: 8px; border-radius: 6px; cursor: pointer; font-weight: 500;">Cancel</button>
    </div>
  `;

  document.body.appendChild(prompt);

  document.getElementById('nl-save-btn').addEventListener('click', () => {
    chrome.runtime.sendMessage({
      action: 'saveCredential',
      data: {
        websiteName: data.websiteName,
        websiteURL: data.url,
        username: data.username,
        email: data.username, // Fallback
        password: data.password
      }
    }, (response) => {
      chrome.storage.local.remove(['pendingSave']);
      prompt.remove();
      if (response && response.success) {
        alert('Password saved securely to NoteLock!');
      } else {
        alert('Failed to save. Make sure you are logged in via the extension.');
      }
    });
  });

  document.getElementById('nl-ignore-btn').addEventListener('click', () => {
    chrome.storage.local.remove(['pendingSave']);
    prompt.remove();
  });
};


// Run on load
setTimeout(() => {
  detectAndAutofill();
  interceptSubmissions();
  checkPendingSave();
  
  // Auto-sync token if on NoteLock website
  if (window.location.href.includes('note-lock-three.vercel.app')) {
    const userStr = localStorage.getItem('notelock_user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.token) {
          chrome.storage.local.set({ token: user.token });
        }
      } catch(e) {}
    }
  }
}, 1000);
