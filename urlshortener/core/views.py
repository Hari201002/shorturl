from django.shortcuts import render

# Create your views here.
import json
from urllib.parse import urlparse
from django.conf import settings
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseRedirect, Http404
from django.views.decorators.http import require_POST, require_GET
from django.views.decorators.csrf import csrf_exempt
from .models import ShortURL
from .utils import generate_unique_code

def _base_url(request):
    # Build base like http://127.0.0.1:8000
    scheme = 'https' if request.is_secure() else 'http'
    host = request.get_host()
    return f"{scheme}://{host}"

def _valid_url(url: str) -> bool:
    try:
        p = urlparse(url)
        return p.scheme in ("http","https") and bool(p.netloc)
    except Exception:
        return False

@csrf_exempt               # simplify dev; for production, use proper CSRF
@require_POST
def create_short_url(request):
    try:
        data = json.loads(request.body.decode("utf-8"))
        long_url = data.get("url","").strip()
    except Exception:
        return HttpResponseBadRequest("Invalid JSON")

    if not _valid_url(long_url):
        return HttpResponseBadRequest("Invalid URL")

    # If already exists, return existing (optional optimization)
    existing = ShortURL.objects.filter(original_url=long_url).first()
    if existing:
        short_url = f"{_base_url(request)}/{existing.short_code}"
        return JsonResponse({"short_url": short_url, "code": existing.short_code})

    code = generate_unique_code(6)
    obj = ShortURL.objects.create(original_url=long_url, short_code=code)
    short_url = f"{_base_url(request)}/{code}"
    return JsonResponse({"short_url": short_url, "code": code})

@require_GET
def stats(request, code: str):
    obj = ShortURL.objects.filter(short_code=code).first()
    if not obj:
        raise Http404("Code not found")
    return JsonResponse({
        "code": obj.short_code,
        "original_url": obj.original_url,
        "clicks": obj.clicks,
        "created_at": obj.created_at.isoformat(),
    })

def redirect_code(request, code: str):
    obj = ShortURL.objects.filter(short_code=code).first()
    if not obj:
        raise Http404("Code not found")
    ShortURL.objects.filter(pk=obj.pk).update(clicks=obj.clicks + 1)
    return HttpResponseRedirect(obj.original_url)

@require_GET
def history(request):
    """Returns list of all shortened URLs with original URL and created date."""
    base = _base_url(request)
    urls = ShortURL.objects.order_by("-created_at").values("short_code", "original_url", "created_at")
    data = [
        {
            "short_url": f"{base}/{u['short_code']}",
            "original_url": u["original_url"],
            "created_at": u["created_at"].isoformat(),
        }
        for u in urls
    ]
    return JsonResponse(data, safe=False)