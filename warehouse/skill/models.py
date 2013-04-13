# coding=utf-8

from django.db import models


class Product(models.Model):
    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Товары"
    name = models.CharField(max_length=50, verbose_name="Наименование")

    def __unicode__(self):
        return self.name
