#!/usr/bin/env python

import os
import sys
from distutils.core import setup
import distutils.command.install
from setuptools import find_packages

execfile('warehouse/version.py')


class my_install(distutils.command.install):
    def run(self):
        distutils.command.install.run(self)
        print '------------------------------------------'

    def _collectstatic(self):
        os.environ.setdefault("DJANGO_SETTINGS_MODULE", "warehouse.settings")
        sys.path.insert(0, os.path.join(os.getcwd(), 'warehouse'))
        from django.core.management import call_command
        call_command('collectstatic', interactive=False)

    def _mklogs(self):
        path = os.path.join(os.getcwd(), 'warehouse', 'logs')
        if not os.path.exists(path):
            os.makedirs(path, 0755)


setup(
    name='Warehouse',
    version=__version__,
    description='Django project to manage warehouse',
    long_description=open('README.rst').read() + '\n\n' + open('HISTORY.rst').read(),
    author='Yauheni Khvaliuk',
    author_email='hvaluk@gmail.com',
    url='https://github.com/hva/warehouse',
    packages=find_packages(),
    include_package_data=True,
    classifiers=[
        # 'https://pypi.python.org/pypi?%3Aaction=list_classifiers'
        'Framework :: Django',
        'Development Status :: 2 - Pre-Alpha',
        'Intended Audience :: Customer Service',
        'Natural Language :: Russian',
        'Programming Language :: Python :: 2',
    ],
    install_requires=[
        "Django == 1.4.5",
    ],
    zip_safe=False,
    cmdclass={"install": my_install},
)
