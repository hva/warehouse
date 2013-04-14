from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.sites.models import Site

from skill.models import ProductType, Product


class ProductAdmin(admin.ModelAdmin):
    list_display = ('type', 'price', 'weight', 'item_length', 'full_length', 'coefficient', 'margin', 'vat')

admin.site.register(ProductType)
admin.site.register(Product, ProductAdmin)

# hide unnesesary models from admin part
admin.site.unregister(Group)
admin.site.unregister(Site)
