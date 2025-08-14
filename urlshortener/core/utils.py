import secrets
from .models import ShortURL

def generate_unique_code(length: int = 6) -> str:
    # token_urlsafe generates URL-safe chars; trim to desired length
    while True:
        code = secrets.token_urlsafe(8)[:length]
        if not ShortURL.objects.filter(short_code=code).exists():
            return code
