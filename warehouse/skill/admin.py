from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.sites.models import Site

from skill.models import Product

admin.site.register(Product)

# hide unnesesary models from admin part
admin.site.unregister(Group)
admin.site.unregister(Site)
