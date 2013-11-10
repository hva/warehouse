Warehouse
=========

About
-----

Simple warehouse web site.

Used technologies: Django, Tastypie on server side, AngularJS, Zurb Foundation on client side.

Interface language: Russian.

Installation
------------

    pip install -U https://github.com/hva/warehouse/tarball/master
    
Django Setup
------------

urls.py

    urlpatterns = patterns('',
        url(r'^', include('warehouse.urls')),
    )
    
settings.py

    TEMPLATE_CONTEXT_PROCESSORS = (
        'django.contrib.auth.context_processors.auth',
        'django.core.context_processors.debug',
        'django.core.context_processors.i18n',
        'django.core.context_processors.media',
        'django.core.context_processors.static',
        'django.core.context_processors.tz',
        'django.contrib.messages.context_processors.messages',
        'warehouse.context_processors.globals',
    )

    INSTALLED_APPS = (
        ...
        'warehouse.skill',
        'warehouse.accounts',
        'warehouse.backup',
    )

    TASTYPIE_ALLOW_MISSING_SLASH = True
