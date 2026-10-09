@echo off
chcp 65001 >nul
REM =====================================================
REM  Dr. Witcha - AI Detective Face Security System
REM  1. Backend  (python main.py)      -> http://localhost:8000
REM  2. Frontend (npm run dev)         -> http://localhost:5173
REM =====================================================
set "PATH=D:\DOW\.tools\nodejs;%PATH%"

cd /d "%~dp0backend"
start "1-Backend :8000" python main.py

cd /d "%~dp0"
start "2-Frontend :5173" cmd /k "set PATH=D:\DOW\.tools\nodejs;%%PATH%% && npm run dev"

echo.
echo กำลังเริ่มต้นระบบ AI Biometric Intelligence System...
echo เข้าใช้งาน Frontend ที่: http://localhost:5173
echo ตรวจสอบสถานะ Backend ที่: http://localhost:8000/docs
echo.
pause
