from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'todolist.views.home', name='home'),
    url(r'^get/$', 'todolist.views.get'),
    url(r'^add/$', 'todolist.views.add'),
    url(r'^remove/$', 'todolist.views.remove'),
    url(r'^edit/$', 'todolist.views.edit'),

    url(r'^admin/', include(admin.site.urls)),
)
