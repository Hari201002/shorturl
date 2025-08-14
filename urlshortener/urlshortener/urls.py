"""
URL configuration for urlshortener project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path
from core import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/shorten/', views.create_short_url, name='create_short_url'),
    path('api/stats/<str:code>/', views.stats, name='stats'),
    # Redirect must be last: any /<code> goes here
    path("api/history/", views.history, name="history"), 
    re_path(r'^(?P<code>[A-Za-z0-9_\-]{4,10})/$', views.redirect_code, name='redirect_code'),
]
