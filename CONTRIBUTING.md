# Contributing to Campus Portal Auto-Login

Thank you for your interest in contributing to **Campus Portal Auto-Login**! 🎉

This project was built to eliminate login friction on campus captive portals and help students and developers maintain uninterrupted connectivity. We welcome contributions of all kinds — from adding support for new university portals to fixing bugs and improving the UI.

---

## 📋 Table of Contents
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Features & New Portals](#suggesting-features--new-portals)
  - [Code Contributions](#code-contributions)
- [Local Development Setup](#local-development-setup)
- [Project Architecture](#project-architecture)
- [Code Style & Principles](#code-style--principles)
- [Pull Request Process](#pull-request-process)
- [Community & Recognition](#community--recognition)

---

## 💡 How Can I Contribute?

### Reporting Bugs
If something isn't working as expected, please [open an issue](https://github.com/rk-roshan-kr/campus-portal-autologin/issues) with:
1. **Clear description**: What went wrong?
2. **Campus / Gateway Info**: Gateway IP or software (e.g. Fortinet, Cyberroam, Sophos, custom university portal).
3. **Browser & OS**: e.g., Chrome 128 on Windows 11.
4. **Console Logs**: Any error messages from `chrome://extensions` (Inspect views: Service worker) or the page console (`F12`).

### Suggesting Features & New Portals
Have an idea or want support for your specific college portal?
* Open an issue labeled `enhancement`.
* If requesting support for a new captive portal form, share the HTML structure of the login form (input names, button selectors) without including any sensitive passwords.

---

## 🛠️ Local Development Setup

No complex build tools, node_modules, or compilers required! The extension is built with pure, native web standards (HTML5, Vanilla CSS, Vanilla JavaScript).

1. **Fork and Clone the Repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/campus-portal-autologin.git
   cd campus-portal-autologin
   ```

2. **Load in Chrome / Edge / Brave**:
   * Open your browser and go to `chrome://extensions`.
   * Enable **Developer mode** (toggle in the top-right corner).
   * Click **Load unpacked** and select the cloned repository folder.

3. **Make and Test Changes**:
   * Edit any file (`popup.html`, `popup.js`, `content.js`, `background.js`).
   * Click the **Reload (🔄)** icon on the extension card in `chrome://extensions` to apply updates immediately.

---

## 🏗️ Project Architecture

```text
campus-portal-autologin/
├── manifest.json         # Manifest V3 extension configuration and permissions
├── background.js         # Service worker: background connectivity watchdog (alarms)
├── content.js            # Injected script: autofill, submit, and anti-spam protection
├── popup.html            # Extension popup UI (dark-mode glassmorphic interface)
├── popup.js              # Popup logic: credentials storage, toggle switch, show/hide pass
├── icons/                # Extension icon assets (16x16, 48x48, 128x128)
├── companion_service/    # Standalone headless Python watchdog for 24/7 background servers
├── CONTRIBUTING.md       # Contribution guidelines
├── PRIVACY_POLICY.md     # User data handling and privacy terms
└── README.md             # Project documentation and setup guide
```

---

## 🔒 Code Style & Principles

1. **Strict Privacy First**: Under no circumstances should user credentials ever leave the device. Telemetry, external trackers, or remote APIs are strictly prohibited.
2. **Zero Bloat**: Keep the core extension lightweight and dependency-free.
3. **Anti-Spam Fail-Safe**: Ensure any form submission logic includes safeguards against infinite reload loops if credentials are invalid.
4. **Manifest V3 Compatibility**: Adhere strictly to Chrome's Manifest V3 service worker lifecycle rules.

---

## 🚀 Pull Request Process

1. **Create a Feature Branch**:
   ```bash
   git checkout -b feat/support-new-portal
   # or
   git checkout -b fix/popup-alignment
   ```
2. **Commit Your Changes**:
   Write clear, concise commit messages following standard conventions:
   * `feat: add support for XYZ portal`
   * `fix: prevent duplicate background tabs on slow networks`
   * `docs: update installation instructions`
3. **Push to Your Fork**:
   ```bash
   git push origin feat/support-new-portal
   ```
4. **Submit a Pull Request**:
   * Open a PR against the `master` branch of [rk-roshan-kr/campus-portal-autologin](https://github.com/rk-roshan-kr/campus-portal-autologin).
   * Describe your changes, what problem it solves, and how you tested it.

---

## 🌟 Community & Recognition

All contributors will be featured in the project release notes and README credits!

Project Maintainer: **Roshan Kumar Gupta** ([@rk-roshan-kr](https://github.com/rk-roshan-kr))
