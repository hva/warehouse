from tastypie import fields
from tastypie.resources import ModelResource
from tastypie.authentication import SessionAuthentication
from tastypie.authorization import Authorization

from warehouse.skill.models import Taxonomy, Product, Operation, Contragent


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


class OperationResource(ModelResource):
    product_id = fields.IntegerField(attribute='product_id', null=True)

    class Meta(MetaBase):
        queryset = Operation.objects.all()
        resource_name = 'operation'


class ContragentResource(ModelResource):
    class Meta(MetaBase):
        queryset = Contragent.objects.all()
        resource_name = 'contragent'
