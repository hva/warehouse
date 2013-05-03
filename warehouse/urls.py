from django.conf.urls import patterns, include, url
from django.contrib import admin

admin.autodiscover()

from tastypie.api import Api
from skill.api import TaxonomyResource

v1_api = Api(api_name='v1')
v1_api.register(TaxonomyResource())

urlpatterns = patterns('',
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', 'skill.views.home'),
    url(r'^accounts/login/$', 'django.contrib.auth.views.login', {'template_name': 'accounts/login.html'}),
    url(r'^accounts/logout/$', 'django.contrib.auth.views.logout', {'next_page': '/'}),
    url(r'^api/', include(v1_api.urls)),
)
