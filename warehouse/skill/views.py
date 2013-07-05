# coding=utf-8

from django.shortcuts import render_to_response
from django.http import HttpResponseRedirect
from django.template import RequestContext
from django.contrib.auth.decorators import login_required

from skill.models import Product
from skill.forms import AttachmentForm


@login_required
def home(request):
    info = [
        {
            'view': 'skill.views.warehouse',
            'title': 'Склад',
            'text': 'Управление товарами на складе: постановка на приход, списание, просмотр остатков.',
            'cls': 'large-4',
        },
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


@login_required
def add_file(request, productId):
    product = Product.objects.get(pk=productId)

    if request.method == 'POST':
        form = AttachmentForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect('/warehouse/#/edit/%s' % productId)
    else:
        form = AttachmentForm()

    return render_to_response('add-file.html', {'form': form, 'product': product}, RequestContext(request))