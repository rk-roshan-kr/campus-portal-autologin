@echo off
powershell -NoProfile -Command "
$cfg = Get-Content 'config.json' -Raw | ConvertFrom-Json
$cfg.paused = $false
$cfg.last_error = $null
$cfg | ConvertTo-Json | Set-Content 'config.json'
Write-Host 'Campus Auto-Login has been RESUMED (ACTIVE).' -ForegroundColor Green
"
pause
