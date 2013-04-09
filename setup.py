#!/usr/bin/env python

import os
from distutils.core import setup
from distutils.command.install import install
from distutils import sysconfig
from setuptools import find_packages

execfile('warehouse/version.py')


print sysconfig.get_config_var("prefix")
print os.getcwd()
raise SystemExit

class post_install(install):
    def run(self):
        install.run(self)
        # os.environ.setdefault("DJANGO_SETTINGS_MODULE", "warehouse.settings")
        # from django.core.management import call_command
        # call_command('collectstatic', '--noinput')
        

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
    cmdclass={"install": post_install},
)
