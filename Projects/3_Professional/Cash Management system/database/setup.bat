@echo off
echo Setting up Business Management Database...
echo.
echo Please enter your PostgreSQL password when prompted
echo.

psql -U postgres -c "CREATE DATABASE business_management;"
psql -U postgres -d business_management -f schema.sql

echo.
echo Database setup complete!
echo.
pause
