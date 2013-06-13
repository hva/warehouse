import time
from gzip import GzipFile

from django.shortcuts import render_to_response
from django.template import RequestContext
from django.http import HttpResponse
from django.core.management import call_command


def home(request):
    return render_to_response('backup.html', {}, RequestContext(request))


def import_data(request):
    filename = 'skill__%s' % time.strftime('%Y%m%d_%H%M%S')

    response = HttpResponse(mimetype='application/force-download')
    response['Content-Disposition'] = 'attachment; filename=%s.gzip' % filename

    gzip_stream = GzipFile(fileobj=response, mode='w', filename='%s.json' % filename)
    call_command('dumpdata', 'skill', stdout=gzip_stream, natural=True, indent=2)

    return response