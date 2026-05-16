@echo off
echo ==========================================
echo Uploading your project to GitHub...
echo ==========================================

:: Try to find git path
set "GIT_PATH=git"
if exist "C:\Program Files\Git\cmd\git.exe" set "GIT_PATH=C:\Program Files\Git\cmd\git.exe"
if exist "C:\Program Files\Git\bin\git.exe" set "GIT_PATH=C:\Program Files\Git\bin\git.exe"
if exist "%LocalAppData%\Programs\Git\cmd\git.exe" set "GIT_PATH=%LocalAppData%\Programs\Git\cmd\git.exe"

echo Using Git from: %GIT_PATH%

"%GIT_PATH%" init
"%GIT_PATH%" rm -r --cached node_modules 2>nul
"%GIT_PATH%" add .
"%GIT_PATH%" config user.email "mdmahadih673@gmail.com"
"%GIT_PATH%" config user.name "Md Mahadi"
"%GIT_PATH%" commit -m "Fix errors and remove node_modules for Vercel build"
"%GIT_PATH%" remote add origin https://github.com/mdmahadih673/INFINITY.git 2>nul
"%GIT_PATH%" remote set-url origin https://github.com/mdmahadih673/INFINITY.git
"%GIT_PATH%" branch -M main
"%GIT_PATH%" push -u origin main --force

echo.
echo ==========================================
echo Process Complete! Check any errors above.
echo ==========================================
pause
