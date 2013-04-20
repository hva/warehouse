# coding=utf-8

from warehouse import __version__


def globals(request):
    return {'globals': {
        'version': __version__,
        'company': u'Скилл',
    }}
