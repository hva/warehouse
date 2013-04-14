import subprocess
import os

from django.db import models
from django.conf import settings
from django.core.management.base import BaseCommand

import skill.models


class Command(BaseCommand):
    help = 'dumps all pt models into pt/sql/<model>.sql'

    dir = os.path.join('skill', 'sql')

    cmd = [
        'mysqldump', '--skip-triggers', '--compact', '--no-create-info',
        '-u', settings.DATABASES.get('default').get('USER'),
        '-p' + settings.DATABASES.get('default').get('PASSWORD'),
        settings.DATABASES.get('default').get('NAME'),
    ]

    def handle(self, *args, **options):
        self._check_dir()
        for model, db_table in self._get_tables():
            file = os.path.join(self.dir, '%s.sql' % model)
            self._dump(file, db_table)

    def _check_dir(self):
        if not os.path.exists(self.dir):
            os.makedirs(self.dir)

    def _get_tables(self):
        for model in models.get_models(skill.models):
            name = model.__name__.lower()
            table = model._meta.db_table
            yield name, table

    def _dump(self, file, db_table):
        cmd = self.cmd + [db_table]
        with open(file, 'w') as f:
            subprocess.call(cmd, shell=True, stdout=f)
