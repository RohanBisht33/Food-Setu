@echo off
REM Change this path to your Python if needed
set PYTHON_PATH=D:\Python\python.exe

REM Change this path to your app.py
set APP_PATH=D:\RB\Food-Setu\app.py

echo Starting Flask server...
start cmd /k "%PYTHON_PATH% %APP_PATH%"

REM Wait 5 seconds for server to boot
timeout /t 5 >nul

REM Open in default browser
start http://127.0.0.1:5000/
