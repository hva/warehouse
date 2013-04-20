# coding=utf-8

from django.db import models


class Taxonomy(models.Model):
    parent = models.ForeignKey('self', null=True)
    title = models.CharField(max_length=32)
    sortorder = models.CharField(max_length=10)


class Product(models.Model):
    taxonomy = models.ForeignKey(Taxonomy)
    title = models.CharField(max_length=32)


class Shipper(models.Model):
    title = models.CharField(max_length=32)


class Buyer(models.Model):
    title = models.CharField(max_length=32)


class Income(models.Model):
    product = models.ForeignKey(Product)
    shipper = models.ForeignKey(Shipper)
    price = models.DecimalField(max_digits=10, decimal_places=0)
    weight = models.FloatField()
    margin = models.IntegerField()
    vat = models.IntegerField()
    create_date = models.DateTimeField()


class Outcome(models.Model):
    income = models.ForeignKey(Income)
    buyer = models.ForeignKey(Buyer)
    weight = models.FloatField()
    create_date = models.DateTimeField()


class Attachment(models.Model):
    ATTACHMENT_TYPE = (
        (0, 'income'),
        (1, 'shipper'),
    )
    item_id = models.IntegerField()
    item_type = models.IntegerField(choices=ATTACHMENT_TYPE)
    description = models.CharField(max_length=256)
    create_date = models.DateTimeField()
