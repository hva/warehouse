import time
from gzip import GzipFile

from django.shortcuts import render_to_response
from django.template import RequestContext
from django.http import HttpResponse, HttpResponseRedirect
from django.core.management import call_command
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.contrib.auth.decorators import login_required

from .forms import BackupImportForm
from .uploadhandler import TemporaryGzipFileUploadHandler

##### IMPORT #####

@login_required
@csrf_exempt
def home(request):
    # changing suffix to '.gz' for temp file names
    request.upload_handlers = [TemporaryGzipFileUploadHandler()]
    return _import_data(request)


@csrf_protect
def _import_data(request):
    if request.method == 'POST':
        form = BackupImportForm(request.POST, request.FILES)
        if form.is_valid():
            _process_file(request.FILES['file'])
            return HttpResponseRedirect('/success/url/')
    else:
        form = BackupImportForm()

    return render_to_response('backup.html', {'form': form}, RequestContext(request))


def _process_file(file):
    file_path = file.temporary_file_path()
    assert 0, file_path


##### EXPORT #####

@login_required
def export_data(request):
    filename = 'skill__%s' % time.strftime('%Y%m%d_%H%M%S')

    response = HttpResponse(mimetype='application/force-download')
    response['Content-Disposition'] = 'attachment; filename=%s.gz' % filename

    with GzipFile(fileobj=response, mode='w', filename='%s.json' % filename) as gz_stream:
        call_command('dumpdata', 'skill', stdout=gz_stream, natural=True, indent=2)

    return response


