# coding=utf-8

from django.shortcuts import render_to_response
from django.template import RequestContext
from django.contrib.auth.decorators import login_required


@login_required
def home(request):
    info = [
        {
            'view': 'skill.views.taxonomy',
            'title': 'Номенклатура',
            'text': 'Редактор товарных позиций, сгруппированных по категриям.',
            'cls': 'large-4',
        },
        {
            'view': 'backup.views.home',
            'title': 'Резервное копирование',
            'text': 'Предоставляет возможность экспорта данных системы в файл для последующего восстановления.',
            'cls': 'large-4',
        },
    ]

    return render_to_response('home.html', {'info': info}, RequestContext(request))


@login_required
def taxonomy(request):
    return render_to_response('taxonomy.html', {}, RequestContext(request))


@login_required
def warehouse(request):
    return render_to_response('warehouse.html', {}, RequestContext(request))
