from tastypie import fields
from tastypie.resources import ModelResource
from tastypie.authentication import SessionAuthentication
from tastypie.authorization import Authorization

from warehouse.skill.models import Taxonomy, Product, Operation, Contragent
from context_processors import get_user_name

product_weight = 'SELECT SUM(weight) FROM skill_operation WHERE product_id = skill_product.id'
product_len = 'SELECT SUM(len) FROM skill_operation WHERE product_id = skill_product.id'


class MetaBase:
    allowed_methods = ['get', 'post', 'put', 'patch', 'delete']
    authentication = SessionAuthentication()
    authorization = Authorization()
    always_return_data = True
    include_resource_uri = False


class TaxonomyResource(ModelResource):
    parent_id = fields.IntegerField(attribute='parent_id', null=True)

    class Meta(MetaBase):
        queryset = Taxonomy.objects.all()
        resource_name = 'taxonomy'
        ordering = ['sortorder']


class ProductResource(ModelResource):
    taxonomy_id = fields.IntegerField(attribute='taxonomy_id', null=True)
    weight = fields.FloatField(attribute='weight', null=True)
    len = fields.FloatField(attribute='len', null=True)

    class Meta(MetaBase):
        queryset = Product.objects.all().extra(select={
            'weight': product_weight,
            'len': product_len
        })
        resource_name = 'product'
        filtering = {
            'taxonomy_id': ['in']
        }
        ordering = ['title']

    # def get_object_list(self, request):
    #     queryset = super(ProductResource, self).get_object_list(request)
    #     assert False, queryset.query
    #     return queryset


class OperationResource(ModelResource):
    class Meta(MetaBase):
        queryset = Operation.objects.all()
        resource_name = 'operation'
        filtering = {
            'product_id': ['exact']
        }

    product_id = fields.IntegerField(attribute='product_id', null=True)
    contragent_id = fields.IntegerField(attribute='contragent_id', null=True)

    def hydrate_user(self, bundle):
        bundle.data['user'] = get_user_name(bundle.request)
        return bundle


class ContragentResource(ModelResource):
    class Meta(MetaBase):
        queryset = Contragent.objects.all()
        resource_name = 'contragent'
