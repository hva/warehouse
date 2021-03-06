# coding=utf-8

from django.db import models
from django.contrib.auth.models import User


class Taxonomy(models.Model):
    parent = models.ForeignKey('self', null=True)
    title = models.CharField(max_length=32)
    sortorder = models.CharField(max_length=16)


class Product(models.Model):
    taxonomy = models.ForeignKey(Taxonomy)
    title = models.CharField(max_length=32)
    price = models.DecimalField(max_digits=10, decimal_places=0)
    vat = models.IntegerField()
    margin = models.IntegerField()
    k = models.FloatField()
    description = models.CharField(max_length=64)
    create_date = models.DateTimeField(auto_now_add=True)


class Contragent(models.Model):
    title = models.CharField(max_length=32)


class Operation(models.Model):
    OPERATION_TYPE = (
        (0, 'in'),
        (1, 'out'),
    )
    product = models.ForeignKey(Product)
    contragent = models.ForeignKey(Contragent)
    weight = models.FloatField()
    len = models.FloatField()
    margin = models.IntegerField(null=True)
    user = models.ForeignKey(User)
    type = models.IntegerField(choices=OPERATION_TYPE, default=0)
    create_date = models.DateTimeField(auto_now_add=True)


class Attachment(models.Model):
    ATTACHMENT_TYPE = (
        (0, 'product'),
        (1, 'contragent'),
    )
    item_id = models.IntegerField()
    item_type = models.IntegerField(choices=ATTACHMENT_TYPE)
    file = models.ImageField(upload_to='attachments/%Y/%m')
    description = models.CharField(max_length=256, null=True, blank=True)
    create_date = models.DateTimeField(auto_now_add=True)
