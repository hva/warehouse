from django.utils.timezone import is_naive
from tastypie.serializers import Serializer


class DateSerializer(Serializer):
    """
    Our own serializer to format datetimes in ISO 8601 but with timezone
    offset.
    http://www.tryolabs.com/Blog/2013/03/16/displaying-timezone-aware-dates-tastypie/
    """

    def format_datetime(self, data):
        # If naive or rfc-2822, default behavior...
        if is_naive(data) or self.datetime_formatting == 'rfc-2822':
            return super(DateSerializer, self).format_datetime(data)

        return data.isoformat()
