const API_URL = 'http://localhost:5000/api';

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  
  if (request.action === 'saveCredential') {
    chrome.storage.local.get(['token'], async (result) => {
      if (!result.token) {
        return sendResponse({ success: false, error: 'Not logged in' });
      }

      try {
        const res = await fetch(`${API_URL}/extension/save`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${result.token}`
          },
          body: JSON.stringify(request.data)
        });

        const data = await res.json();
        if (res.ok) {
          sendResponse({ success: true, data });
        } else {
          sendResponse({ success: false, error: data.message });
        }
      } catch (error) {
        sendResponse({ success: false, error: error.message });
      }
    });
    return true; // Keep message channel open for async response
  }

  if (request.action === 'fetchCredentials') {
    chrome.storage.local.get(['token'], async (result) => {
      if (!result.token) {
        return sendResponse({ success: false, error: 'Not logged in' });
      }

      try {
        const res = await fetch(`${API_URL}/extension/fetch?url=${encodeURIComponent(request.url)}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${result.token}`
          }
        });

        const data = await res.json();
        if (res.ok) {
          sendResponse({ success: true, data });
        } else {
          sendResponse({ success: false, error: data.message });
        }
      } catch (error) {
        sendResponse({ success: false, error: error.message });
      }
    });
    return true; // Keep message channel open for async response
  }
});
