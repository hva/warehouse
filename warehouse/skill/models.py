# coding=utf-8

from django.db import models


class ProductType(models.Model):
    class Meta:
        verbose_name = 'Позиция'
        verbose_name_plural = 'Позиции'
    name = models.CharField(max_length=50, verbose_name='Наименование')

    def __unicode__(self):
        return self.name


class Product(models.Model):
    class Meta:
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'

    type = models.ForeignKey(ProductType, verbose_name='Наименование')
    price = models.DecimalField(max_digits=10, decimal_places=0, verbose_name='Приходная цена за 1 тонну без НДС')
    weight = models.FloatField(verbose_name='Тоннаж (т)')
    item_length = models.FloatField(verbose_name='Длина штанги (м)')
    full_length = models.FloatField(verbose_name='Метраж (м)')
    coefficient = models.FloatField(verbose_name='Коэффициент')
    margin = models.IntegerField(verbose_name='Наценка (%)')
    vat = models.IntegerField(verbose_name='Ставка НДС (%)')

    # def __unicode__(self):
    #     return self.name
