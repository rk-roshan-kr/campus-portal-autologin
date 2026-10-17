# ⚡ Campus Portal Auto-Login

<div align="center">

![Version](https://img.shields.io/badge/version-2.1.0-blue.svg?style=for-the-badge)
![Manifest](https://img.shields.io/badge/Manifest-V3-success.svg?style=for-the-badge)
![Platform](https://img.shields.io/badge/Chrome%20|%20Edge%20|%20Brave-4285F4.svg?style=for-the-badge&logo=google-chrome&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-orange.svg?style=for-the-badge)

**Automated, hands-free authentication for campus captive portals.**  
Eliminates login friction, keeps your connection alive 24/7, and prevents lockout spam.

Developed by [**Roshan Kumar Gupta** (@rk-roshan-kr)](https://github.com/rk-roshan-kr)

</div>

---

## 🎯 The Problem

Most university networks and corporate Wi-Fi/Ethernet setups utilize **captive portals** (Fortinet, Sophos, Cyberroam, etc.) that:
1. **Expire every 12–24 hours**, disconnecting your PC without warning.
2. Only prompt for login when you **manually search or browse an unencrypted HTTP page**.
3. Cause **endless reload loops / spam** when a password changes or authentication fails, risking account lockouts.
4. Break background tasks, downloads, headless servers, and remote connections (e.g. Tailscale, RDP, SSH) when unattended.

---

## ✨ Features

* 🚀 **Autonomous Background Watchdog**: Uses `chrome.alarms` to periodically test internet connectivity (`generate_204`). If the captive portal intercepts traffic, it opens the login panel, authenticates, and automatically cleans up the tab.
* 🛡️ **Anti-Spam Fail-Safe**: Detects failed authentication attempts. If incorrect credentials are entered, the extension automatically pauses itself and displays an alert instead of spamming the server in an infinite reload loop.
* ⏸️ **Master Pause & Resume Switch**: Quick-toggle between Active and Paused modes directly from the extension popup.
* ⚙️ **Configurable Gateway**: Defaults to the campus gateway (`http://172.16.2.1/`), but supports custom URLs/IPs for compatibility with any university portal.
* 🎨 **Modern Dark-Mode UI**: Built with a sleek dark glassmorphic interface, tactile toggle switch, live status indicators, and show/hide password toggle.
* 🔒 **Local & Secure**: Your credentials never leave your browser; stored strictly in your local device's `chrome.storage.local`.

---

## 📦 Installation Guide

### Method 1: Load Unpacked (Chrome, Edge, Brave, Opera)

1. Clone or download this repository:
   ```bash
   git clone https://github.com/rk-roshan-kr/campus-portal-autologin.git
   ```
2. Open your browser and navigate to the Extensions page:
   * **Chrome / Brave**: `chrome://extensions`
   * **Microsoft Edge**: `edge://extensions`
3. Enable **Developer mode** (toggle in the top-right corner).
4. Click **Load unpacked** and select the extension folder:
   ```text
   D:\opensource\campus-portal-autologin
   ```
5. Pin the extension icon to your toolbar!

### Method 2: From ZIP Release
1. Download `campus-portal-autologin-v2.1.0.zip` from the [Releases](https://github.com/rk-roshan-kr/campus-portal-autologin/releases) folder.
2. Unzip the file to any permanent folder on your PC.
3. In `chrome://extensions`, click **Load unpacked** and select the unzipped directory.

---

## 🛠️ Usage

1. Click the **Campus Auto-Login** icon in your browser toolbar.
2. Enter your campus **Username / UID** and **Password**.
3. (Optional) Under **Gateway Settings**, customize the portal IP or domain if your network uses a different login address.
4. Click **Save Credentials**.
5. Ensure the top toggle is set to **Active**. The extension will now automatically handle all authentication in the background!

---

## 🖥️ Headless / Background Service (For Closet/24x7 PCs)

For PCs running 24/7 without a browser window open, a companion Python watchdog is provided in the repository under `/companion_service/`:
* Runs completely headless as a background service or Windows Task.
* Checks connectivity every 60 seconds and auto-authenticates directly via HTTP POST.

---

## 🤝 Contributing

Contributions, bug reports, and feature requests are welcome!
Feel free to open an issue or submit a pull request on GitHub:

👉 **[https://github.com/rk-roshan-kr/campus-portal-autologin](https://github.com/rk-roshan-kr/campus-portal-autologin)**

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) &copy; 2026 Roshan Kumar Gupta.
