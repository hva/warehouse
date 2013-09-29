from tastypie import fields
from tastypie.resources import ModelResource

from warehouse.skill.api.meta import MetaBase
from warehouse.skill.models import Product

product_weight = 'SELECT SUM(weight) FROM skill_operation WHERE product_id = skill_product.id'
product_len = 'SELECT SUM(len) FROM skill_operation WHERE product_id = skill_product.id'


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
