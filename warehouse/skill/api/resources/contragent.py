from tastypie.resources import ModelResource

from warehouse.skill.api.meta import MetaBase
from warehouse.skill.models import Contragent


class ContragentResource(ModelResource):
    class Meta(MetaBase):
        queryset = Contragent.objects.all()
        resource_name = 'contragent'
