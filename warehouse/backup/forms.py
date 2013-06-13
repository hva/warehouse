# coding=utf-8

from django import forms

error_messages = {
    'required': 'Файл не выбран',
}


class BackupImportForm(forms.Form):
    file = forms.FileField(error_messages=error_messages)
