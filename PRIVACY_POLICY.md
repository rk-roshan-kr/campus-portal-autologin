# Privacy Policy for Campus Portal Auto-Login

**Last updated:** October 17, 2026

**Campus Portal Auto-Login** ("the Extension") is an open-source browser extension developed by Roshan Kumar Gupta ([@rk-roshan-kr](https://github.com/rk-roshan-kr)).

We are strongly committed to user privacy. This policy outlines how your data is handled.

---

### 1. Data Collection and Usage

* **Login Credentials (Username and Password)**:
  * When you enter your campus credentials in the extension popup, they are stored **strictly and solely on your local device** using Chrome's native `chrome.storage.local` API.
  * Your credentials are only read by the extension's local content script to fill the login form on your designated campus gateway.
  * **Your credentials are NEVER transmitted, shared, uploaded, or synced to any external server, third party, or the developer.**

* **Network and Browsing Activity**:
  * The Extension does **not** track, record, or monitor your web browsing history.
  * The Extension does not collect personal identifiers, device fingerprints, or telemetry data.
  * No external tracking scripts, advertising libraries, or third-party analytics are embedded.

---

### 2. Permissions Justification

* **`storage`**: Used solely to persist your login credentials and your Active/Paused toggle preference locally in your browser.
* **`alarms`**: Used to schedule an automated connectivity check every minute so the extension can detect when the campus portal has disconnected.
* **`tabs`**: Used to open the captive portal login tab in the background and close it automatically once authentication succeeds.
* **Host Permissions (`http://172.16.2.1/*`, `http://172.20.64.1/*`, `http://connectivitycheck.gstatic.com/*`)**:
  * Used to interact with the local campus login gateway and test internet status via Google's lightweight `generate_204` endpoint.

---

### 3. Open Source Transparency

The complete source code of the Extension is publicly available for audit and verification at:  
👉 **[https://github.com/rk-roshan-kr/campus-portal-autologin](https://github.com/rk-roshan-kr/campus-portal-autologin)**

---

### 4. Contact

If you have any questions or concerns regarding this privacy policy, please open an issue on the GitHub repository or contact:  
**Developer:** Roshan Kumar Gupta  
**GitHub:** [https://github.com/rk-roshan-kr](https://github.com/rk-roshan-kr)
