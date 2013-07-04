from tastypie.authentication import SessionAuthentication
from tastypie.authorization import Authorization

from serializer import DateSerializer

class MetaBase:
    allowed_methods = ['get', 'post', 'put', 'patch', 'delete']
    authentication = SessionAuthentication()
    authorization = Authorization()
    always_return_data = True
    include_resource_uri = False
    serializer = DateSerializer()
