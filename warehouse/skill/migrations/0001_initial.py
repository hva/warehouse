# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Taxonomy'
        db.create_table('skill_taxonomy', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('parent', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['skill.Taxonomy'], null=True)),
            ('title', self.gf('django.db.models.fields.CharField')(max_length=32)),
            ('sortorder', self.gf('django.db.models.fields.CharField')(max_length=10)),
        ))
        db.send_create_signal('skill', ['Taxonomy'])

        # Adding model 'Product'
        db.create_table('skill_product', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('taxonomy', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['skill.Taxonomy'])),
            ('title', self.gf('django.db.models.fields.CharField')(max_length=32)),
        ))
        db.send_create_signal('skill', ['Product'])

        # Adding model 'Shipper'
        db.create_table('skill_shipper', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('title', self.gf('django.db.models.fields.CharField')(max_length=32)),
        ))
        db.send_create_signal('skill', ['Shipper'])

        # Adding model 'Buyer'
        db.create_table('skill_buyer', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('title', self.gf('django.db.models.fields.CharField')(max_length=32)),
        ))
        db.send_create_signal('skill', ['Buyer'])

        # Adding model 'Income'
        db.create_table('skill_income', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('product', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['skill.Product'])),
            ('shipper', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['skill.Shipper'])),
            ('price', self.gf('django.db.models.fields.DecimalField')(max_digits=10, decimal_places=0)),
            ('weight', self.gf('django.db.models.fields.FloatField')()),
            ('margin', self.gf('django.db.models.fields.IntegerField')()),
            ('vat', self.gf('django.db.models.fields.IntegerField')()),
            ('create_date', self.gf('django.db.models.fields.DateTimeField')()),
        ))
        db.send_create_signal('skill', ['Income'])

        # Adding model 'Outcome'
        db.create_table('skill_outcome', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('income', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['skill.Income'])),
            ('buyer', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['skill.Buyer'])),
            ('weight', self.gf('django.db.models.fields.FloatField')()),
            ('create_date', self.gf('django.db.models.fields.DateTimeField')()),
        ))
        db.send_create_signal('skill', ['Outcome'])

        # Adding model 'Attachment'
        db.create_table('skill_attachment', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('item_id', self.gf('django.db.models.fields.IntegerField')()),
            ('item_type', self.gf('django.db.models.fields.IntegerField')()),
            ('description', self.gf('django.db.models.fields.CharField')(max_length=256)),
            ('create_date', self.gf('django.db.models.fields.DateTimeField')()),
        ))
        db.send_create_signal('skill', ['Attachment'])


    def backwards(self, orm):
        # Deleting model 'Taxonomy'
        db.delete_table('skill_taxonomy')

        # Deleting model 'Product'
        db.delete_table('skill_product')

        # Deleting model 'Shipper'
        db.delete_table('skill_shipper')

        # Deleting model 'Buyer'
        db.delete_table('skill_buyer')

        # Deleting model 'Income'
        db.delete_table('skill_income')

        # Deleting model 'Outcome'
        db.delete_table('skill_outcome')

        # Deleting model 'Attachment'
        db.delete_table('skill_attachment')


    models = {
        'skill.attachment': {
            'Meta': {'object_name': 'Attachment'},
            'create_date': ('django.db.models.fields.DateTimeField', [], {}),
            'description': ('django.db.models.fields.CharField', [], {'max_length': '256'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'item_id': ('django.db.models.fields.IntegerField', [], {}),
            'item_type': ('django.db.models.fields.IntegerField', [], {})
        },
        'skill.buyer': {
            'Meta': {'object_name': 'Buyer'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'title': ('django.db.models.fields.CharField', [], {'max_length': '32'})
        },
        'skill.income': {
            'Meta': {'object_name': 'Income'},
            'create_date': ('django.db.models.fields.DateTimeField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'margin': ('django.db.models.fields.IntegerField', [], {}),
            'price': ('django.db.models.fields.DecimalField', [], {'max_digits': '10', 'decimal_places': '0'}),
            'product': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['skill.Product']"}),
            'shipper': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['skill.Shipper']"}),
            'vat': ('django.db.models.fields.IntegerField', [], {}),
            'weight': ('django.db.models.fields.FloatField', [], {})
        },
        'skill.outcome': {
            'Meta': {'object_name': 'Outcome'},
            'buyer': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['skill.Buyer']"}),
            'create_date': ('django.db.models.fields.DateTimeField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'income': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['skill.Income']"}),
            'weight': ('django.db.models.fields.FloatField', [], {})
        },
        'skill.product': {
            'Meta': {'object_name': 'Product'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'taxonomy': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['skill.Taxonomy']"}),
            'title': ('django.db.models.fields.CharField', [], {'max_length': '32'})
        },
        'skill.shipper': {
            'Meta': {'object_name': 'Shipper'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'title': ('django.db.models.fields.CharField', [], {'max_length': '32'})
        },
        'skill.taxonomy': {
            'Meta': {'object_name': 'Taxonomy'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'parent': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['skill.Taxonomy']", 'null': 'True'}),
            'sortorder': ('django.db.models.fields.CharField', [], {'max_length': '10'}),
            'title': ('django.db.models.fields.CharField', [], {'max_length': '32'})
        }
    }

    complete_apps = ['skill']