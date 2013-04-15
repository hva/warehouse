# coding=utf-8

from version import __version__


def globals(request):
    return {'globals': {
        'version': __version__,
        'company': u'Скилл',
    }}
