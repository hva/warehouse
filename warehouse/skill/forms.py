# coding=utf-8

from django import forms

from warehouse.skill.models import Attachment


error_messages = {
    'required': 'Файл не выбран',
}


class AttachmentForm(forms.ModelForm):
    file = forms.ImageField(error_messages=error_messages)

    class Meta:
        model = Attachment