from tastypie.resources import ModelResource

from skill.api.meta import MetaBase
from warehouse.skill.models import Attachment


class AttachmentResource(ModelResource):
    class Meta(MetaBase):
        queryset = Attachment.objects.all()
        resource_name = 'attachment'
        filtering = {
            'item_id': ['exact']
        }
