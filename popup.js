const masterToggle = document.getElementById('masterToggle');
const statusDot = document.getElementById('statusDot');
const statusText = document.getElementById('statusText');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const portalUrlInput = document.getElementById('portalUrl');
const togglePasswordBtn = document.getElementById('togglePasswordBtn');
const gatewayToggle = document.getElementById('gatewayToggle');
const gatewayContent = document.getElementById('gatewayContent');
const gatewayArrow = document.getElementById('gatewayArrow');
const saveBtn = document.getElementById('saveBtn');
const alertBanner = document.getElementById('alertBanner');
const authorLink = document.getElementById('authorLink');
const githubRepoLink = document.getElementById('githubRepoLink');

const GITHUB_PROFILE = "https://github.com/rk-roshan-kr";
const GITHUB_REPO = "https://github.com/rk-roshan-kr/campus-portal-autologin";

function updateStatusUI(isPaused, lastError) {
  if (isPaused) {
    masterToggle.checked = false;
    statusDot.className = 'pulse-dot paused';
    statusText.textContent = 'Paused • Auto-login disabled';
  } else {
    masterToggle.checked = true;
    statusDot.className = 'pulse-dot';
    statusText.textContent = 'Active • Monitoring connection';
  }

  if (lastError) {
    showAlert(lastError, 'error');
  } else {
    hideAlert();
  }
}

function showAlert(msg, type = 'success') {
  alertBanner.textContent = msg;
  alertBanner.className = type === 'error' ? 'alert-banner alert-error' : 'alert-banner alert-success';
  alertBanner.style.display = 'block';
}

function hideAlert() {
  alertBanner.style.display = 'none';
}

// Load saved data
chrome.storage.local.get(['username', 'password', 'portalUrl', 'isPaused', 'lastError'], (data) => {
  if (data.username) usernameInput.value = data.username;
  if (data.password) passwordInput.value = data.password;
  if (data.portalUrl) portalUrlInput.value = data.portalUrl;
  
  updateStatusUI(data.isPaused, data.lastError);
});

// Master Active / Pause Toggle
masterToggle.addEventListener('change', () => {
  const isPaused = !masterToggle.checked;
  
  chrome.storage.local.set({ 
    isPaused: isPaused,
    lastError: isPaused ? null : null 
  }, () => {
    chrome.action.setBadgeText({ text: isPaused ? "PAUSE" : "ON" });
    chrome.action.setBadgeBackgroundColor({ color: isPaused ? "#F43F5E" : "#10B981" });
    updateStatusUI(isPaused, null);
    
    if (!isPaused) {
      showAlert('⚡ Auto-login resumed and active!', 'success');
      setTimeout(hideAlert, 2500);
    }
  });
});

// Show / Hide Password
let isPasswordVisible = false;
togglePasswordBtn.addEventListener('click', () => {
  isPasswordVisible = !isPasswordVisible;
  passwordInput.type = isPasswordVisible ? 'text' : 'password';
  togglePasswordBtn.style.color = isPasswordVisible ? '#38BDF8' : '#64748B';
});

// Collapsible Gateway Settings
gatewayToggle.addEventListener('click', () => {
  const isOpen = gatewayContent.classList.toggle('open');
  gatewayArrow.textContent = isOpen ? '▲' : '▼';
});

// Save Credentials
saveBtn.addEventListener('click', () => {
  const username = usernameInput.value.trim();
  const password = passwordInput.value;
  const portalUrl = portalUrlInput.value.trim() || 'http://172.16.2.1/';

  if (!username || !password) {
    showAlert('Please enter both username and password.', 'error');
    return;
  }

  chrome.storage.local.set({
    username,
    password,
    portalUrl,
    lastError: null
  }, () => {
    showAlert('✓ Credentials saved! Auto-login is ready.', 'success');
    updateStatusUI(false, null);
    chrome.action.setBadgeText({ text: "ON" });
    chrome.action.setBadgeBackgroundColor({ color: "#10B981" });
    setTimeout(hideAlert, 3000);
  });
});

// Outbound Links
authorLink.addEventListener('click', (e) => {
  e.preventDefault();
  chrome.tabs.create({ url: GITHUB_PROFILE });
});

githubRepoLink.addEventListener('click', (e) => {
  e.preventDefault();
  chrome.tabs.create({ url: GITHUB_REPO });
});