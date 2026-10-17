@echo off
powershell -NoProfile -Command "
$cfg = Get-Content 'config.json' -Raw | ConvertFrom-Json
$cfg.paused = $true
$cfg | ConvertTo-Json | Set-Content 'config.json'
Write-Host 'Campus Auto-Login has been PAUSED.' -ForegroundColor Yellow
"
pause
