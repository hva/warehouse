#!/usr/bin/env python

from distutils.core import setup

execfile('warehouse/version.py')

setup(
    name='Warehouse',
    version=__version__,
    description='Django project to manage warehouse',
    long_description=open('README.rst').read() + '\n\n' + open('HISTORY.rst').read(),
    author='Yauheni Khvaliuk',
    author_email='hvaluk@gmail.com',
    url='https://github.com/hva/warehouse',
    packages=[
        'warehouse',
    ],
    classifiers=[
        # 'https://pypi.python.org/pypi?%3Aaction=list_classifiers'
        'Framework :: Django',
        'Development Status :: 2 - Pre-Alpha',
        'Intended Audience :: Customer Service',
        'Natural Language :: Russian',
        'Programming Language :: Python :: 2',
    ],
    install_requires=[
        "Django == 1.5.1",
    ],
)
