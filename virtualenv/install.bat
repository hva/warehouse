set dir=env

rmdir /s /q %dir%
call c:\Python27\python.exe virtualenv.py %dir%

call %dir%\Scripts\activate

easy_install "libs\MySQL-python-1.2.3.win32-py2.7.exe"
pip install -r reqs.txt

call deactivate