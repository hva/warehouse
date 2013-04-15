from django.shortcuts import render_to_response
from django.template import RequestContext
from models import Product


def home(request):
    products = Product.objects.all()
    return render_to_response('index.html', {'products': products}, RequestContext(request))
