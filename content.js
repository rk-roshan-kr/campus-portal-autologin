chrome.storage.local.get(["username", "password", "isPaused"], (data) => {
  // If user paused the extension, do nothing
  if (data.isPaused) {
    showBanner("⏸️ Campus Auto-Login is PAUSED. Click the extension icon to resume.", "#64748B");
    return;
  }

  if (!data.username || !data.password) {
    return;
  }

  const userField = document.querySelector('input[name="username"]') || document.getElementById('username');
  const passField = document.querySelector('input[name="password"]') || document.getElementById('password');
  const submitBtn = document.querySelector('input[type="submit"], button[type="submit"], input[name="login"]');

  if (!userField || !passField) {
    return;
  }

  // Detect if a previous login attempt on this tab failed to prevent spam loops
  const wasAttempted = sessionStorage.getItem('campus_login_attempted') === 'true';

  if (wasAttempted) {
    sessionStorage.removeItem('campus_login_attempted');
    
    // Auto-pause to stop spamming the firewall/server
    chrome.storage.local.set({
      isPaused: true,
      lastError: "Login failed (incorrect username or password). Auto-login paused to prevent account lockout."
    });

    showBanner("⚠️ Campus Auto-Login PAUSED: Incorrect credentials detected. Auto-login stopped. Please update credentials or resume in extension popup.", "#EF4444");
    return;
  }

  // Normal flow: fill and submit
  userField.value = data.username;
  passField.value = data.password;
  userField.dispatchEvent(new Event('input', { bubbles: true }));
  passField.dispatchEvent(new Event('input', { bubbles: true }));
  userField.dispatchEvent(new Event('change', { bubbles: true }));
  passField.dispatchEvent(new Event('change', { bubbles: true }));

  // Mark that an attempt was made on this page session
  sessionStorage.setItem('campus_login_attempted', 'true');

  setTimeout(() => {
    if (submitBtn) {
      submitBtn.click();
    } else {
      const form = userField.closest('form');
      if (form) form.submit();
    }
  }, 400);
});

function showBanner(text, bgColor) {
  if (document.getElementById('campus-autologin-banner')) return;
  const banner = document.createElement('div');
  banner.id = 'campus-autologin-banner';
  banner.style.position = 'fixed';
  banner.style.top = '0';
  banner.style.left = '0';
  banner.style.width = '100%';
  banner.style.backgroundColor = bgColor;
  banner.style.color = 'white';
  banner.style.textAlign = 'center';
  banner.style.padding = '10px 16px';
  banner.style.fontSize = '13px';
  banner.style.fontWeight = '600';
  banner.style.fontFamily = 'system-ui, -apple-system, sans-serif';
  banner.style.zIndex = '999999';
  banner.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
  banner.textContent = text;
  document.body.prepend(banner);
}