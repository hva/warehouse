#!/bin/bash

dir="env"

rm -rf $dir
python virtualenv.py $dir

source $dir/bin/activate
pip install -r reqs.txt
deactivate

