@echo off
chcp 65001 >nul
cd /d "%~dp0"
title Firefly Blog Dev Server
echo ============================================
echo   Firefly Blog - Local Dev Server
echo   URL: http://localhost:4321/
echo   Press Ctrl+C to stop the server.
echo ============================================
echo.
call pnpm dev
pause
