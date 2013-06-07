# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):

        # Changing field 'Taxonomy.sortorder'
        db.alter_column('skill_taxonomy', 'sortorder', self.gf('django.db.models.fields.CharField')(max_length=16))

    def backwards(self, orm):

        # Changing field 'Taxonomy.sortorder'
        db.alter_column('skill_taxonomy', 'sortorder', self.gf('django.db.models.fields.CharField')(max_length=10))

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
            'sortorder': ('django.db.models.fields.CharField', [], {'max_length': '16'}),
            'title': ('django.db.models.fields.CharField', [], {'max_length': '32'})
        }
    }

    complete_apps = ['skill']