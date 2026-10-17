import os
import sys
import time
import json
import re
import urllib.request
import urllib.parse
from datetime import datetime

DIR_PATH = os.path.dirname(os.path.abspath(__file__))
CONFIG_FILE = os.path.join(DIR_PATH, "config.json")
LOG_FILE = os.path.join(DIR_PATH, "watchdog.log")
CHECK_URL = "http://connectivitycheck.gstatic.com/generate_204"

def log(msg):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    formatted = f"[{timestamp}] {msg}"
    print(formatted, flush=True)
    try:
        with open(LOG_FILE, "a", encoding="utf-8") as f:
            f.write(formatted + "\n")
    except Exception:
        pass

def load_config():
    if not os.path.exists(CONFIG_FILE):
        return {
            "username": "",
            "password": "",
            "portal_url": "http://172.16.2.1",
            "check_interval_seconds": 60,
            "paused": False,
            "last_error": None
        }
    try:
        with open(CONFIG_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        log(f"Error reading config: {e}")
        return None

def save_config(config):
    try:
        with open(CONFIG_FILE, "w", encoding="utf-8") as f:
            json.dump(config, f, indent=2)
    except Exception as e:
        log(f"Error saving config: {e}")

def is_online():
    try:
        req = urllib.request.Request(CHECK_URL, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
        with urllib.request.urlopen(req, timeout=5) as res:
            return res.status == 204
    except Exception:
        return False

def attempt_login(config):
    username = config.get("username", "").strip()
    password = config.get("password", "")
    portal_url = config.get("portal_url", "http://172.16.2.1")

    if not username or not password:
        log("No username or password specified in config.json. Skipping login.")
        return False

    log(f"Internet connection lost. Attempting login to portal at {portal_url}...")

    # Build opener with cookie support
    cookie_processor = urllib.request.HTTPCookieProcessor()
    opener = urllib.request.build_opener(cookie_processor)

    # First fetch the portal landing page to establish cookies
    try:
        req = urllib.request.Request(portal_url, headers={"User-Agent": "Mozilla/5.0"})
        with opener.open(req, timeout=6) as res:
            html = res.read().decode("utf-8", errors="ignore")
    except Exception as e:
        log(f"Failed to load portal landing page: {e}")
        html = ""

    # Prepare POST data
    post_data = {
        "username": username,
        "password": password,
        "login": "Login"
    }
    encoded_data = urllib.parse.urlencode(post_data).encode("utf-8")

    try:
        req = urllib.request.Request(
            portal_url,
            data=encoded_data,
            headers={
                "User-Agent": "Mozilla/5.0",
                "Content-Type": "application/x-www-form-urlencoded"
            }
        )
        with opener.open(req, timeout=8) as res:
            resp_body = res.read().decode("utf-8", errors="ignore").lower()

            # Check for authentication errors in the response
            if re.search(r"invalid|incorrect|failed|denied|wrong password|failure", resp_body):
                log("⚠️ Authentication FAILED: Incorrect username or password detected.")
                log("Auto-login PAUSED to prevent account lockout. Update config.json to resume.")
                config["paused"] = True
                config["last_error"] = "Authentication failed (incorrect credentials)"
                save_config(config)
                return False

    except Exception as e:
        log(f"Login POST request encountered error: {e}")

    time.sleep(2)
    if is_online():
        log("✅ Login successful! Internet access restored.")
        if config.get("last_error"):
            config["last_error"] = None
            save_config(config)
        return True
    else:
        log("Post submitted, but connection is still not returning 204. Will recheck next cycle.")
        return False

def main():
    log("==========================================")
    log("Campus Network Auto-Login Watchdog Started")
    log("==========================================")

    while True:
        config = load_config()
        if not config:
            time.sleep(10)
            continue

        if config.get("paused"):
            # If user paused, check every interval without doing login
            time.sleep(config.get("check_interval_seconds", 60))
            continue

        if is_online():
            # Online and healthy
            time.sleep(config.get("check_interval_seconds", 60))
        else:
            # Offline or intercepted: attempt login
            attempt_login(config)
            time.sleep(10)

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        log("Watchdog stopped by user.")
        sys.exit(0)
