@echo off
setlocal
cd /d "%~dp0"
echo.
echo ==============================================
echo  DAYONE v2.2 - DEPLOY TO EXISTING NETLIFY SITE
 echo ==============================================
echo.
echo This installs only free developer tools and deploys the PWA +
echo Netlify Function. Use the SAME site to preserve your data.
echo.
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed. Install the free LTS version from https://nodejs.org/
  echo Then run this file again.
  pause
  exit /b 1
)
where npm >nul 2>nul
if errorlevel 1 (
  echo npm is unavailable. Please reinstall free Node.js LTS.
  pause
  exit /b 1
)
echo [1/3] Installing dependencies...
call npm install
if errorlevel 1 goto :failed
echo.
echo [2/3] Preparing optional local photo-alignment model...
call npm run build
if errorlevel 1 goto :failed
echo.
echo [3/3] Signing in and deploying to Netlify...
echo When asked, LINK TO YOUR EXISTING SITE rather than creating another one.
call npx --yes netlify-cli login
if errorlevel 1 goto :failed
call npx --yes netlify-cli deploy --prod --dir=site --functions=netlify/functions
if errorlevel 1 goto :failed
echo.
echo SUCCESS: Check the website and the Function endpoint.
echo If the Function returns 503, set DAYONE_SYNC_KEY in Netlify and run again.
pause
exit /b 0
:failed
echo.
echo Deployment did not finish. Read the error above. Your previous site remains intact.
pause
exit /b 1
