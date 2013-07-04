from django.conf.urls import patterns, include, url
from django.contrib import admin

from skill.api.urls import v1_api

admin.autodiscover()

urlpatterns = patterns(
    '',
    url(r'^admin/', include(admin.site.urls)),

    # accounts
    url(r'^accounts/login/$', 'django.contrib.auth.views.login', {'template_name': 'accounts/login.html'}),
    url(r'^accounts/logout/$', 'django.contrib.auth.views.logout', {'next_page': '/'}),

    # skill
    url(r'^$', 'skill.views.home'),
    url(r'^taxonomy/$', 'skill.views.taxonomy'),
    url(r'^warehouse/$', 'skill.views.warehouse'),

    # backup
    url(r'^backup/$', 'backup.views.home'),
    url(r'^backup/export$', 'backup.views.export_gz'),
    url(r'^backup/import$', 'backup.views.import_gz'),

    # api
    url(r'^api/', include(v1_api.urls)),
)
