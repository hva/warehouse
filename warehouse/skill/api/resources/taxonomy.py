from tastypie import fields
from tastypie.resources import ModelResource

from warehouse.skill.api.meta import MetaBase
from warehouse.skill.models import Taxonomy

class TaxonomyResource(ModelResource):
    parent_id = fields.IntegerField(attribute='parent_id', null=True)

    class Meta(MetaBase):
        queryset = Taxonomy.objects.all()
        resource_name = 'taxonomy'
        ordering = ['sortorder']
