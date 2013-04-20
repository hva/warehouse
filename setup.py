#!/usr/bin/env python

import os
import sys
from setuptools import setup, find_packages
from setuptools.command.install import install as _install


class install(_install):
    def run(self):
        self._collectstatic()
        _install.run(self)

    def _collectstatic(self):
        os.environ.setdefault("DJANGO_SETTINGS_MODULE", "warehouse.settings")
        sys.path.insert(0, os.path.join(os.getcwd(), 'warehouse'))
        from django.core.management import call_command
        call_command('collectstatic', interactive=False)


version = __import__('warehouse').__version__

setup(
    name='Warehouse',
    version=version,
    description='Django project to manage warehouse',
    long_description=open('README.md').read() + '\n\n' + open('HISTORY.rst').read(),
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
        'Django == 1.4.5',
        'South==0.7.6',
    ],
    zip_safe=False,
    cmdclass={'install': install},
)
