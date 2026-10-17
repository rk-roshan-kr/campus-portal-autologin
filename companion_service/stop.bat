@echo off
echo Stopping Campus Auto-Login Watchdog...
wmic process where "commandline like '%%watchdog.py%%' and name='python.exe'" delete >nul 2>&1
echo Watchdog stopped.
pause
