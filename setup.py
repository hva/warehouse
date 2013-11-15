#!/usr/bin/env python

from setuptools import setup, find_packages


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
        'Natural Language :: Russian',
        'Programming Language :: Python :: 2',
    ],
    install_requires=[
        # 'Django==1.5.4',
        'django-tastypie==0.10.0',
        'mimeparse==0.1.3',
        # 'pil==1.1.7',
        'python-dateutil==2.1',
        'six==1.4.1',
    ],
    zip_safe=False,
)
