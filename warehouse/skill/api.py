from tastypie import fields
from tastypie.resources import ModelResource
from tastypie.authentication import SessionAuthentication
from tastypie.authorization import Authorization

from warehouse.skill.models import Taxonomy, Product


class MetaBase:
    allowed_methods = ['get', 'post', 'put', 'patch', 'delete']
    authentication = SessionAuthentication()
    authorization = Authorization()
    always_return_data = True


class TaxonomyResource(ModelResource):
    parent_id = fields.IntegerField(attribute='parent_id', null=True)

    class Meta(MetaBase):
        queryset = Taxonomy.objects.all()
        resource_name = 'taxonomy'
        ordering = ['sortorder']


class ProductResource(ModelResource):
    taxonomy_id = fields.IntegerField(attribute='taxonomy_id', null=True)

    class Meta(MetaBase):
        queryset = Product.objects.all()
        resource_name = 'product'
