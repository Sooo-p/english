# -*- coding: utf-8 -*-
"""
파일 두 개를 만듭니다.

  index.html     GitHub Pages 용 — 진짜 웹페이지 한 벌(doctype/head/body 전부).
                 폰에서 제대로 보이려면 viewport 설정이 반드시 있어야 합니다.
  artifact.html  클로드 아티팩트 용 — 아티팩트는 head/body 를 자기가 씌우므로
                 몸통만 넘깁니다.

쓰는 법:  python build.py
"""
import io, os

HERE = os.path.dirname(os.path.abspath(__file__))
def read(name):
    with io.open(os.path.join(HERE, name), encoding='utf-8') as f:
        return f.read()
def write(name, text):
    with io.open(os.path.join(HERE, name), 'w', encoding='utf-8', newline='') as f:
        f.write(text)

# _head.html 을 '스타일까지'와 '화면 마크업'으로 가릅니다.
head_file = read('_head.html')
cut = head_file.index('</style>') + len('</style>')
head_part = head_file[:cut]          # title + 글꼴 link + style
body_part = head_file[cut:]          # div 들

code = read('sentences.js') + read('_data2.js') + read('_data3.js') + read('_data4.js') + read('_data5.js') + read('_data7.js') + read('_app.js')

# ── 아티팩트용: 예전과 똑같이 몸통만 ──────────────────────────────
write('artifact.html', head_part + body_part + code)

# ── GitHub Pages 용: 완전한 웹페이지 ─────────────────────────────
META = """<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="#E9EDEA" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0D1310" media="(prefers-color-scheme: dark)">
<meta name="description" content="영어 왕초보를 위한 하루 10분 문장 연습">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="열다섯 문장">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%2300713F'/%3E%3Ctext x='32' y='45' font-size='36' text-anchor='middle' fill='white' font-family='sans-serif' font-weight='700'%3E15%3C/text%3E%3C/svg%3E">
"""
write('index.html', META + head_part + "\n</head>\n<body>" + body_part + code + "\n</body>\n</html>\n")

print('index.html   %6d bytes  (GitHub Pages)' % len(read('index.html')))
print('artifact.html %6d bytes  (Claude artifact)' % len(read('artifact.html')))
