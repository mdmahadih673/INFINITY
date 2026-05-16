@echo off
echo ==========================================
echo Uploading your project to GitHub...
echo ==========================================

git init
git rm -r --cached node_modules 2>nul
git add .
git config user.email "mdmahadih673@gmail.com"
git config user.name "Md Mahadi"
git commit -m "Fix errors and remove node_modules for Vercel build"
git remote add origin https://github.com/mdmahadih673/INFINITY.git 2>nul
git remote set-url origin https://github.com/mdmahadih673/INFINITY.git
git branch -M main
git push -u origin main --force

echo.
echo ==========================================
echo Process Complete! Check any errors above.
echo ==========================================
pause
