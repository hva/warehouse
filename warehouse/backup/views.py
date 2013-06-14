# coding=utf-8

import os
import time
from gzip import GzipFile
from StringIO import StringIO

from django.shortcuts import render_to_response, redirect
from django.template import RequestContext
from django.http import HttpResponse
from django.core.management import call_command
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.contrib.auth.decorators import login_required
from django.contrib import messages

from .forms import BackupImportForm
from .uploadhandler import TemporaryGzipFileUploadHandler

breadcrumbs = [
    ['skill.views.home', 'главная'],
    ['backup.views.home', 'резервное копирование'],
]

info = [
    {
        'view': 'backup.views.export_gz',
        'title': 'Экспорт',
        'text': 'Позволяет сохранить данные из системы в файл для последующего восстановления.',
        'cls': 'large-4',
    },
    {
        'view': 'backup.views.import_gz',
        'title': 'Импорт',
        'text': 'Позволяет восстановить данные из файла. Внимание! Все существующие записи будут безвозвратно утеряны!',
        'cls': 'large-4',
    },
]

##### HOME   #####

@login_required
def home(request):
    return render_to_response('backup/home.html', {'breadcrumbs': breadcrumbs, 'info': info}, RequestContext(request))


##### EXPORT #####

@login_required
def export_gz(request):
    filename = 'skill__%s' % time.strftime('%Y%m%d_%H%M%S.gz')

    response = HttpResponse(mimetype='application/force-download')
    response['Content-Disposition'] = 'attachment; filename=%s' % filename

    with GzipFile(fileobj=response, mode='w', filename='skill.json') as gz_stream:
        call_command('dumpdata', 'skill', stdout=gz_stream, natural=True, indent=2)

    return response


##### IMPORT #####

@login_required
@csrf_exempt
def import_gz(request):
    # changing suffix to '.gz' for temp file names
    request.upload_handlers = [TemporaryGzipFileUploadHandler()]
    return _import_gz(request)


@csrf_protect
def _import_gz(request):
    if request.method == 'POST':
        form = BackupImportForm(request.POST, request.FILES)
        if form.is_valid():
            message = _process_file(request.FILES['file'])
            messages.success(request, message)
            return redirect('backup.views.home')
    else:
        form = BackupImportForm()

    cur = ['backup.views.import_gz', 'импорт']
    return render_to_response(
        'backup/import.html',
        {'form': form, 'breadcrumbs': breadcrumbs + [cur]},
        RequestContext(request)
    )


def _process_file(f):
    file_path = f.temporary_file_path()
    if not f.closed:
        f.close()

    stream = StringIO()
    call_command('loaddata', file_path, stdout=stream)
    message = stream.getvalue()
    stream.close()

    os.unlink(file_path)
    return message