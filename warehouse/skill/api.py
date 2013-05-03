from tastypie.resources import ModelResource
from skill.models import Taxonomy


class TaxonomyResource(ModelResource):
    class Meta:
        queryset = Taxonomy.objects.all()
        resource_name = 'taxonomy'
