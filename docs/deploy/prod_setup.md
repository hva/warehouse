Production setup
----------------

required libs

    sudo apt-get install mysql-server python-dev libmysqlclient-dev

init SQL

    CREATE DATABASE skill DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

nginx.conf

    # the upstream component nginx needs to connect to
    upstream django {
        server unix:///home/hva/wh/skill.sock;
        }

    # configuration of the server
    server {
        listen      80;
        server_name .skill;

        charset     utf-8;

        access_log    /home/hva/wh/logs/nginx_access.log;
        error_log     /home/hva/wh/logs/nginx_error.log;

        # max upload size
        client_max_body_size 75M;

        location /media  {
            alias /home/hva/wh/media;
        }

        location /static {
            alias /home/hva/wh/warehouse/static;
        }

        location / {
            uwsgi_pass  django;
            include     /home/hva/wh/uwsgi_params;
            }
        }

uwsgi.ini

    [uwsgi]

    # python path
    home        = /home/hva/wh/env
    chdir       = /home/hva/wh/warehouse
    pythonpath  = /home/hva/wh
    module      = wsgi
    env = DJANGO_SETTINGS_MODULE=settings_local

    # log
    daemonize = /home/hva/wh/logs/uwsgi.log

    # django relaod
    touch-reload = /home/hva/wh/warehouse/wsgi.py

    # pid
    pidfile = /home/hva/wh/uwsgi.pid

    # other
    master       = true
    max-requests = 5000
    processes    = 10
    socket       = /home/hva/wh/skill.sock
    chmod-socket = 666
    vacuum       = true
    harakiri     = 30
    limit-as     = 128
