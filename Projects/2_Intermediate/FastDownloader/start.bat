@echo off
echo ========================================
echo Universal Media Downloader
echo ========================================
echo.
echo Installing dependencies...
pip install flask flask-cors yt-dlp
echo.
echo Starting server...
python server.py
pause
