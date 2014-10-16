from django.shortcuts import render, render_to_response, HttpResponse, RequestContext
from .models import Todo
from django.core import serializers

import json


def home(request):
    context = RequestContext(request)
    return render_to_response('home.html', context)


def get(request):
    import time
    time.sleep(0.5)
    todos = Todo.objects.all()
    data = serializers.serialize('json', todos)
    return HttpResponse(data, content_type="application/json")


def add(request):
    text = json.loads(request.body.decode('utf-8'))['text']
    todo = Todo(text=text)
    todo.save()
    return HttpResponse('')


def remove(request):
    todo_id = json.loads(request.body.decode('utf-8'))['id']
    Todo.objects.get(pk=todo_id).delete()
    return HttpResponse('')


def edit(request):
    todo_obj = json.loads(request.body.decode('utf-8'))
    print(todo_obj)
    todo_id = todo_obj['id']['pk']
    todo_text = todo_obj['id']['fields']['text']
    todo_done = todo_obj['id']['fields']['done']
    todo = Todo.objects.get(pk=todo_id)
    todo.text = todo_text
    todo.done = todo_done
    todo.save()
    return HttpResponse('')

