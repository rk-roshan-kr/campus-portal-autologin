# Campus Network Auto-Login (Native Watchdog)

A zero-dependency background watchdog that keeps your campus internet connection alive 24/7 without needing a browser open.

## Files

* **`config.json`**: Store your `username` and `password`. Also holds `"paused": false`.
* **`start_silent.vbs`**: Double-click to start the watchdog silently in the background (no cmd window).
* **`stop.bat`**: Double-click to stop the background watchdog.
* **`status.bat`**: Double-click to check if the watchdog is running and test internet connectivity.
* **`pause.bat` / `resume.bat`**: Instantly pause or resume auto-login.
* **`install_startup_task.bat`**: Run as Administrator to automatically start on Windows boot.

## How It Works

1. Every 60 seconds, it sends a lightweight check to `http://connectivitycheck.gstatic.com/generate_204`.
2. When internet is active (`204`), it stays completely idle.
3. If the connection drops or is intercepted by the campus portal:
   * It checks if it is paused.
   * If not paused, it logs in via POST request.
   * If the portal returns an invalid password/credentials error, it **automatically pauses** and logs the error to avoid spamming or locking your account.
