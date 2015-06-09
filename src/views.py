from django.http import Http404, HttpResponseRedirect, HttpResponse, HttpResponsePermanentRedirect
from django.template import RequestContext#, Template
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.db import IntegrityError
# from django.core.urlresolvers import reverse
# from django.core.mail import send_mail
from django.shortcuts import render, render_to_response, redirect
# from django import forms

from src.models import *
from src.settings import *

import datetime
import simplejson
import sys
import time
import traceback
# from sys import stderr


def index(request):
	return render_to_response(PATH.HTML_PATH['index'], {}, context_instance=RequestContext(request))


# def url_redirect(request, path):
# 	if 'detail/' in path:
# 		path = path.rstrip('/')
# 	if request.GET.get('searchtext'):
# 		path = path + '?searchtext=' + request.GET.get('searchtext')
# 	return HttpResponsePermanentRedirect("/%s" % path)

# def error404(request):
# 	return render_to_response(PATH.HTML_PATH['404'], {}, context_instance=RequestContext(request))

# def error500(request):
# 	# exc_type, exc_value, exc_tb = sys.exc_info()
# 	# body = '%s\n%s\n%s\n' % (exc_value, exc_type, traceback.format_exception(exc_type, exc_value, exc_tb))
# 	# send_mail('Subject', body, EMAIL_HOST_USER, [EMAIL_NOTIFY])
# 	return render_to_response(PATH.HTML_PATH['500'], {}, context_instance=RequestContext(request))



