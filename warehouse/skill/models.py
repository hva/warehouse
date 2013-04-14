# coding=utf-8

from django.db import models


class ProductType(models.Model):
    class Meta:
        verbose_name = "Позиция"
        verbose_name_plural = "Позиции"
    name = models.CharField(max_length=50, verbose_name="Наименование")

    def __unicode__(self):
        return self.name


class Product(models.Model):
    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Товары"
    route = models.ForeignKey(ProductType, verbose_name="Позиция")

    def __unicode__(self):
        return self.name
