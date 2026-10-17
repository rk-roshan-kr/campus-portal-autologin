@echo off
echo Registering Campus Auto-Login as a Windows Startup Task...
schtasks /create /tn "CampusAutoLoginWatchdog" /tr "wscript.exe \"D:\campus_autologin\start_silent.vbs\"" /sc onlogon /rl highest /f
echo.
if %ERRORLEVEL% equ 0 (
    echo Task registered successfully! It will now automatically run when you sign into Windows.
) else (
    echo Please run this batch file as Administrator to register the startup task.
)
pause
