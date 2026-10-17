# 🛍️ Chrome Web Store Listing Submission Guide

Use the pre-filled information below when filling out your submission on the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole).

---

## 1. Package Upload
* **ZIP File**: Upload `D:\opensource\campus-portal-autologin\release\chrome-web-store-v2.1.0.zip`

---

## 2. Store Listing Tab

### Product Details
* **Name**: `Campus Portal Auto-Login`
* **Short Description** *(Max 132 chars)*:  
  `Automated hands-free authentication for campus captive portals with background watchdog and anti-spam protection.`
* **Category**: `Productivity` (or `Developer Tools`)
* **Language**: `English`

### Detailed Description *(Copy and paste into Description box)*:
```markdown
Campus Portal Auto-Login eliminates the frustration of campus captive portals that log you out every 12 to 24 hours.

⚡ KEY FEATURES:
• Autonomous Background Watchdog: Periodically monitors internet connectivity in the background. If the captive portal intercepts your connection, it automatically launches the login page, authenticates, and cleans up the tab—no manual web searches needed!
• Anti-Spam Protection: Detects authentication failures. If an invalid password is entered, the extension automatically pauses itself to prevent infinite reload loops and avoid account lockouts.
• Master Pause / Active Switch: Toggle auto-login on or off with a single click from the modern dark-mode popup.
• Customizable Gateway: Works out-of-the-box with campus gateways (such as 172.16.2.1) and allows custom gateway URLs for compatibility with any university or enterprise portal (Fortinet, Sophos, Cyberroam, etc.).
• Privacy First: All credentials are saved strictly on your local device (chrome.storage.local). Nothing is ever sent to external servers or third parties.

Open Source on GitHub:
https://github.com/rk-roshan-kr/campus-portal-autologin
```

---

## 3. Privacy Tab

### Single Purpose Justification
> `To automatically authenticate and maintain network access on campus captive portals without requiring manual browser navigation.`

### Permission Justifications
* **`storage`**:  
  > `Required to securely save the user's campus login credentials and their active/paused preference locally on their device.`
* **`alarms`**:  
  > `Required to schedule a periodic 1-minute background check to detect when network access has expired and trigger re-authentication.`
* **`tabs`**:  
  > `Required to open the captive portal login tab in the background and close it once internet connectivity is verified.`
* **Host Permissions (`http://172.16.2.1/*`, etc.)**:  
  > `Required to detect captive portal redirects on the connectivity check endpoint and interact with the local campus authentication form.`

### Privacy Policy URL
> `https://github.com/rk-roshan-kr/campus-portal-autologin/blob/master/PRIVACY_POLICY.md`

### Data Usage Declarations:
* Check: *"This extension does not collect or transmit user data outside the user's device."*
* Under **Authentication Information**: Select *"Used solely for core extension functionality"* and confirm it is stored only locally.

---

## 4. Graphic Assets
* **Store Icon**: `icons/icon128.png` (128x128 PNG)
* **Screenshots**: At least 1 screenshot (1280x800 or 640x400 PNG) showing the extension popup or active status.
