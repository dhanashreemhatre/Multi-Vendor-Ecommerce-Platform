from django.contrib import admin
from django.urls import path,include,re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    path("accounts/",include("accounts.urls")),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path("",include("store.urls")),
    path("vendor/",include("vendor.urls")),

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

