# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'ProductType'
        db.create_table('skill_producttype', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=50)),
        ))
        db.send_create_signal('skill', ['ProductType'])

        # Adding model 'Product'
        db.create_table('skill_product', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('type', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['skill.ProductType'])),
            ('price', self.gf('django.db.models.fields.DecimalField')(max_digits=10, decimal_places=0)),
            ('weight', self.gf('django.db.models.fields.FloatField')()),
            ('item_length', self.gf('django.db.models.fields.FloatField')()),
            ('full_length', self.gf('django.db.models.fields.FloatField')()),
            ('coefficient', self.gf('django.db.models.fields.FloatField')()),
            ('margin', self.gf('django.db.models.fields.IntegerField')()),
            ('vat', self.gf('django.db.models.fields.IntegerField')()),
        ))
        db.send_create_signal('skill', ['Product'])


    def backwards(self, orm):
        # Deleting model 'ProductType'
        db.delete_table('skill_producttype')

        # Deleting model 'Product'
        db.delete_table('skill_product')


    models = {
        'skill.product': {
            'Meta': {'object_name': 'Product'},
            'coefficient': ('django.db.models.fields.FloatField', [], {}),
            'full_length': ('django.db.models.fields.FloatField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'item_length': ('django.db.models.fields.FloatField', [], {}),
            'margin': ('django.db.models.fields.IntegerField', [], {}),
            'price': ('django.db.models.fields.DecimalField', [], {'max_digits': '10', 'decimal_places': '0'}),
            'type': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['skill.ProductType']"}),
            'vat': ('django.db.models.fields.IntegerField', [], {}),
            'weight': ('django.db.models.fields.FloatField', [], {})
        },
        'skill.producttype': {
            'Meta': {'object_name': 'ProductType'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        }
    }

    complete_apps = ['skill']