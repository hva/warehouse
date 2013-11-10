from tastypie import fields
from tastypie.resources import ModelResource

from warehouse.skill.api.meta import MetaBase
from warehouse.skill.models import Operation
from warehouse.context_processors import extract_user_name


class OperationResource(ModelResource):
    class Meta(MetaBase):
        queryset = Operation.objects.select_related('user').all()
        resource_name = 'operation'
        filtering = {
            'product_id': ['exact']
        }

    product_id = fields.IntegerField(attribute='product_id', null=True)
    contragent_id = fields.IntegerField(attribute='contragent_id', null=True)
    user = fields.CharField()

    def dehydrate_user(self, bundle):
        user = bundle.obj.user
        return extract_user_name(user)

    def hydrate_user(self, bundle):
        bundle.obj.user = bundle.request.user
        return bundle

    #def get_object_list(self, request):
    #     queryset = super(OperationResource, self).get_object_list(request)
    #     assert False, queryset.query
    #     return queryset
