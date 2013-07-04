# coding=utf-8

from warehouse import __version__



def globals(request):
    return {'globals': {
        'version': __version__,
        'company': u'Скилл',
        'username': get_user_name(request)
    }}

def get_user_name(request):
    user = request.user
    username = user.username
    if user.first_name or user.last_name:
        username = '%s %s' % (user.first_name, user.last_name)
    return username.strip()
