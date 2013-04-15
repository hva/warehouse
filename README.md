Warehouse
=========

About
-----

Django web site to manage warehouse.

Installation
------------

    pip install -U https://github.com/hva/warehouse/tarball/master

Requirements
------------

    http://ftp.byfly.by/pub/apache.org//httpd/binaries/win32/httpd-2.2.22-win32-x86-no_ssl.msi

    https://modwsgi.googlecode.com/files/mod_wsgi-win32-ap22py27-3.3.so

    LoadModule wsgi_module modules/mod_wsgi.so

    https://pypi.python.org/packages/2.7/s/setuptools/setuptools-0.6c11.win32-py2.7.exe

    http://cdn.mysql.com/Downloads/MySQL-5.5/mysql-5.5.30-win32.msi

    CREATE DATABASE skill DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

    WSGIPythonPath "c:/Python27/Lib/site-packages/warehouse"
    <VirtualHost *:80>
        ServerAdmin webmaster@localhost
        ServerName skill

        Alias /static "c:/Python27/Lib/site-packages/warehouse/static"
        <Directory "c:/Python27/Lib/site-packages/warehouse/static">
        Order deny,allow
        Allow from all
        </Directory>

        WSGIScriptAlias / "c:/Python27/Lib/site-packages/warehouse/wsgi.py"
        <Directory "c:/Python27/Lib/site-packages/warehouse">
        <Files wsgi.py>
        Order deny,allow
        Allow from all
        </Files>
        </Directory>

        LogLevel info
        ErrorLog  "c:/Program Files (x86)/Apache Software Foundation/Apache2.2/logs/warehouse_error.log"
        CustomLog "c:/Program Files (x86)/Apache Software Foundation/Apache2.2/logs/warehouse_access.log" combined
    </VirtualHost>
