from tastypie.api import Api
from warehouse.skill.api.resources import (
    TaxonomyResource,
    ProductResource,
    OperationResource,
    ContragentResource,
    AttachmentResource,
    )

v1_api = Api(api_name='v1')
v1_api.register(TaxonomyResource())
v1_api.register(ProductResource())
v1_api.register(OperationResource())
v1_api.register(ContragentResource())
v1_api.register(AttachmentResource())
