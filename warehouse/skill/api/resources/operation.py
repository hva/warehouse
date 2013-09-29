from tastypie import fields
from tastypie.resources import ModelResource

from warehouse.skill.api.meta import MetaBase
from warehouse.skill.models import Operation
from warehouse.context_processors import get_user_name


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
