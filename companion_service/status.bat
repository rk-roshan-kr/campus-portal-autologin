@echo off
echo ==============================================
echo   Campus Network Auto-Login Status
echo ==============================================
echo.
powershell -NoProfile -Command "
$proc = Get-CimInstance Win32_Process -Filter \"Name = 'python.exe'\" | Where-Object { $_.CommandLine -like '*watchdog.py*' }
if ($proc) {
    Write-Host 'Watchdog Service : RUNNING (PID: ' $proc.ProcessId ')' -ForegroundColor Green
} else {
    Write-Host 'Watchdog Service : STOPPED' -ForegroundColor Red
}

try {
    $r = Invoke-WebRequest -Uri 'http://connectivitycheck.gstatic.com/generate_204' -TimeoutSec 3 -UseBasicParsing
    if ($r.StatusCode -eq 204) {
        Write-Host 'Internet Status  : ONLINE (204 OK)' -ForegroundColor Green
    } else {
        Write-Host 'Internet Status  : CAPTIVE PORTAL DETECTED' -ForegroundColor Yellow
    }
} catch {
    Write-Host 'Internet Status  : OFFLINE / INTERCEPTED' -ForegroundColor Yellow
}

$cfg = Get-Content 'config.json' -Raw | ConvertFrom-Json
if ($cfg.paused) {
    Write-Host 'Auto-Login Mode  : PAUSED' -ForegroundColor Red
    if ($cfg.last_error) {
        Write-Host ('Last Error       : ' + $cfg.last_error) -ForegroundColor Yellow
    }
} else {
    Write-Host 'Auto-Login Mode  : ACTIVE' -ForegroundColor Green
}
"
echo.
echo ==============================================
pause
