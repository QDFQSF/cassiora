@echo off
title Cassiora Traiteur
echo Demarrage de Cassiora...
echo.

REM Cherche Python
where python >nul 2>&1
if %errorlevel% == 0 (
    python server.py
    goto end
)

where python3 >nul 2>&1
if %errorlevel% == 0 (
    python3 server.py
    goto end
)

REM Python pas trouvé
echo ERREUR : Python n'est pas installe sur ce PC.
echo.
echo Telecharge Python sur : https://www.python.org/downloads/
echo Coche "Add Python to PATH" pendant l'installation.
echo.
pause
:end
