# coding=utf-8

from django.db import models


class Taxonomy(models.Model):
    parent = models.ForeignKey('self', null=True)
    title = models.CharField(max_length=32)
    sortorder = models.CharField(max_length=16)


class Product(models.Model):
    taxonomy = models.ForeignKey(Taxonomy)
    title = models.CharField(max_length=32)
    price = models.DecimalField(max_digits=10, decimal_places=0)
    margin = models.IntegerField()
    vat = models.IntegerField()
    weight = models.FloatField()
    k = models.FloatField()
    create_date = models.DateTimeField()


class Contragent(models.Model):
    title = models.CharField(max_length=32)


class Operation(models.Model):
    product = models.ForeignKey(Product)
    contragent = models.ForeignKey(Contragent)
    weight = models.FloatField()
    create_date = models.DateTimeField()


class Attachment(models.Model):
    ATTACHMENT_TYPE = (
        (0, 'product'),
        (1, 'contragent'),
    )
    item_id = models.IntegerField()
    item_type = models.IntegerField(choices=ATTACHMENT_TYPE)
    description = models.CharField(max_length=256)
    create_date = models.DateTimeField()
