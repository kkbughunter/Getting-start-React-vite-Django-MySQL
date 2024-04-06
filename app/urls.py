from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path('content/', views.receive_input, name='receive_input'),
]