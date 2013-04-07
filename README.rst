Warehouse
==================

About
-----

TODO: Enter a description

Installation
------------

http://ftp.byfly.by/pub/apache.org//httpd/binaries/win32/httpd-2.2.22-win32-x86-no_ssl.msi

https://modwsgi.googlecode.com/files/mod_wsgi-win32-ap22py27-3.3.so

LoadModule wsgi_module modules/mod_wsgi.so

https://pypi.python.org/packages/2.7/s/setuptools/setuptools-0.6c11.win32-py2.7.exe#md5=57e1e64f6b7c7f1d2eddfc9746bbaf20

pip install -U git+https://github.com/hva/warehouse.git

WSGIPythonPath "c:/Python27/Lib/site-packages/warehouse"
<VirtualHost *:80>
        ServerAdmin webmaster@localhost
        ServerName skill

        Alias /static "c:/Python27/Lib/site-packages/warehouse/static"
        <Directory "c:/Python27/Lib/site-packages/warehouse/static">
        Order deny,allow
        Allow from all
        </Directory>

        # WSGIDaemonProcess skill python-path="c:/Python27/Lib/site-packages/warehouse"

        WSGIScriptAlias / "c:/Python27/Lib/site-packages/warehouse/wsgi.py"
        <Directory "c:/Python27/Lib/site-packages/warehouse">
        <Files wsgi.py>
        Order deny,allow
        Allow from all
        </Files>
        </Directory>

        LogLevel info
        ErrorLog  "c:/Python27/Lib/site-packages/warehouse/logs/error.log"
        CustomLog "c:/Python27/Lib/site-packages/warehouse/logs/access.log" combined
</VirtualHost>
