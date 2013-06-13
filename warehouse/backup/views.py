import time

from django.shortcuts import render_to_response
from django.template import RequestContext
from django.http import HttpResponse
from django.core.management import call_command


def home(request):
    return render_to_response('backup.html', {}, RequestContext(request))


def import_data(request):
    filename = 'skill__%s.json' % time.strftime('%Y%m%d_%H%M%S')

    response = HttpResponse(mimetype='application/force-download')
    response['Content-Disposition'] = 'attachment; filename=%s' % filename

    call_command('dumpdata', 'skill', stdout=response, natural=True, indent=2)

    return response