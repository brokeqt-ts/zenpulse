$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$logsDir = Join-Path $PSScriptRoot "..\logs"
New-Item -ItemType Directory -Force -Path $logsDir | Out-Null
$logFile = Join-Path $logsDir "expo_$timestamp.log"

Write-Host "Лог сохраняется в: $logFile"
Start-Transcript -Path $logFile -Append | Out-Null

try {
    npx expo start
} finally {
    Stop-Transcript | Out-Null
}
