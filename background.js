const CHECK_URL = "http://connectivitycheck.gstatic.com/generate_204";
const ALARM_NAME = "campus_portal_check";

// Create recurring check every 1 minute
chrome.alarms.create(ALARM_NAME, { periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === ALARM_NAME) {
    checkAndTriggerLogin();
  }
});

chrome.runtime.onInstalled.addListener(() => {
  checkAndTriggerLogin();
});

chrome.runtime.onStartup.addListener(() => {
  checkAndTriggerLogin();
});

async function checkAndTriggerLogin() {
  const data = await chrome.storage.local.get(["username", "password", "portalUrl", "isPaused"]);
  const portalUrl = data.portalUrl || "http://172.16.2.1/";

  if (data.isPaused) {
    chrome.action.setBadgeText({ text: "PAUSE" });
    chrome.action.setBadgeBackgroundColor({ color: "#F43F5E" });
    return;
  }

  if (!data.username || !data.password) {
    chrome.action.setBadgeText({ text: "SET" });
    chrome.action.setBadgeBackgroundColor({ color: "#F59E0B" });
    return;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(CHECK_URL, {
      cache: "no-store",
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.status === 204) {
      // Internet is active!
      chrome.action.setBadgeText({ text: "ON" });
      chrome.action.setBadgeBackgroundColor({ color: "#10B981" });
      
      // Close auto-opened portal tabs now that internet is back
      closePortalTabsIfAny(portalUrl);
      return;
    }
  } catch (err) {
    // Intercepted or request dropped
  }

  // Captive portal detected
  chrome.action.setBadgeText({ text: "LOG" });
  chrome.action.setBadgeBackgroundColor({ color: "#6366F1" });

  openPortalTabIfNotOpen(portalUrl);
}

function openPortalTabIfNotOpen(portalUrl) {
  try {
    const parsed = new URL(portalUrl);
    const pattern = `*://${parsed.hostname}/*`;

    chrome.tabs.query({ url: pattern }, (tabs) => {
      if (!tabs || tabs.length === 0) {
        chrome.tabs.create({ url: portalUrl, active: false });
      } else {
        // Tab already open, reload to trigger content script
        chrome.tabs.reload(tabs[0].id);
      }
    });
  } catch (e) {
    chrome.tabs.create({ url: portalUrl, active: false });
  }
}

function closePortalTabsIfAny(portalUrl) {
  try {
    const parsed = new URL(portalUrl);
    const pattern = `*://${parsed.hostname}/*`;

    chrome.tabs.query({ url: pattern }, (tabs) => {
      if (tabs && tabs.length > 0) {
        for (const t of tabs) {
          chrome.tabs.remove(t.id).catch(() => {});
        }
      }
    });
  } catch (e) {}
}
