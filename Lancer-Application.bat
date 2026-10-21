@echo off
REM Lance directement l'application dans Google Chrome ou Microsoft Edge
if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
    start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" "%~dp0index.html"
    exit
)
if exist "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" (
    start "" "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" "%~dp0index.html"
    exit
)
start "" "%~dp0index.html"
