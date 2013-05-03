from tastypie.resources import ModelResource
from tastypie.authorization import DjangoAuthorization

from skill.models import Taxonomy


class MetaBase:
    allowed_methods = ['get', 'post', 'put', 'patch', 'delete']
    authorization = DjangoAuthorization()
    always_return_data = True


class TaxonomyResource(ModelResource):
    class Meta(MetaBase):
        queryset = Taxonomy.objects.all()
        resource_name = 'taxonomy'
