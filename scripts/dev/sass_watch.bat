@echo off
set OLDDIR=%CD%

cd /d %~dp0\..\warehouse\skill\static
call scss --watch scss:css

cd %OLDDIR%