from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static

from skill.api.urls import v1_api

admin.autodiscover()

urlpatterns = patterns(
    '',
    #url(r'^admin/', include(admin.site.urls)),

    # accounts
    url(r'^accounts/login/$', 'django.contrib.auth.views.login', {'template_name': 'accounts/login.html'}),
    url(r'^accounts/logout/$', 'django.contrib.auth.views.logout', {'next_page': '/'}),

    # skill
    url(r'^$', 'warehouse.skill.views.home'),
    url(r'^taxonomy/$', 'warehouse.skill.views.taxonomy'),
    url(r'^warehouse/$', 'warehouse.skill.views.warehouse'),

    # backup
    url(r'^backup/$', 'warehouse.backup.views.home'),
    url(r'^backup/export$', 'warehouse.backup.views.export_gz'),
    url(r'^backup/import$', 'warehouse.backup.views.import_gz'),

    # api
    url(r'^api/', include(v1_api.urls)),

    # upload
    url(r'^warehouse/product/(?P<productId>\d{1,4})/add_file$', 'warehouse.skill.views.add_file'),

)  # + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
