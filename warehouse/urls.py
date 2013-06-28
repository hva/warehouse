from django.conf.urls import patterns, include, url
from django.contrib import admin

admin.autodiscover()

from tastypie.api import Api
from skill.api import TaxonomyResource, ProductResource

v1_api = Api(api_name='v1')
v1_api.register(TaxonomyResource())
v1_api.register(ProductResource())

urlpatterns = patterns('',
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
