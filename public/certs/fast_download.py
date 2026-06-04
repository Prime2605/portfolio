import urllib.request
import os
import concurrent.futures

os.makedirs('c:/Projects/Portfolio/public/certs', exist_ok=True)
ids = [
  '15uCpmj0FuC934kR7sLVJScsDcOM8wRkP', '1YG9MutlUK3s2c6VCuqDl4-zmsLjLheev', '1dZX4n7jC2ZFaCGFymZbceHyMnahZYii4',
  '13PYJYnI8NKImTvABLAXgZLh3lAgAeczU', '1CIevT824g2PeKq--9QDFYH91RC8KAQmX', '1xFsYn3jE6jxumdCkFrcd_KXh7maqjjFZ',
  '1Xc-mDE0YDTIVCnEBaVjgP6tOWiwRoftV', '1MqeiKsJ4MrCwwSNpQdCGeRJqGvOyV7Tb', '1A5UF4Vs1HKMvMZNEeTlWPLm-d8mczyzF',
  '1FcIO1JbiWeqyHtNl5_Uoh3YZjjbJ8Yga', '13-CXBTGmug3noakvBJq4r3n3ved7DQwk', '1v2Ar-J6n2U_fnqZnIG5rHuDyPYTzgFbD',
  '1wHtA88evTo25yOpd2GNKsZzabWGqIMKn', '1vFpe6m2WvwHcEw-QWZaUGP4Pccv0tue2', '1dwC1QsBZyVTeq1E4ZS9dkI7keI3322fb',
  '1nJS1qGl6cquIWtiPnU2IZANp4ekJk_Nq', '1eIqQhZ7Q4_BOp21ehkyyJgAlT4kbjMKm', '1iGb4-e7J9iD4I8cIE2TAiGcvL_iIMx3R',
  '1jdgn5zAGoJRKyUwcA9HrtZVWysQ0M9e3', '1gmBOeLgC8Yl4tz2coTeriBVHnwXGwjEl', '1p253OxTv8I-xKxW2kLGBynjzIk5-LxRi',
  '1Mhd2kJh3Ck3LFwmKi4Shvy4-jrSotXLt', '11lKSwl7u-l9MuRsM_9CAP1bE-fkdI-d3', '1o7Rm5mFj2vbTguAIhDq7xngT2MIjZJJL'
]

def download_id(i):
    path = f'c:/Projects/Portfolio/public/certs/{i}.png'
    if not os.path.exists(path):
        try:
            urllib.request.urlretrieve(f'https://drive.usercontent.google.com/download?id={i}&export=download&authuser=0', path)
            print(f"Downloaded {i}")
        except Exception as e:
            print(f"Failed {i}: {e}")

with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
    executor.map(download_id, ids)
