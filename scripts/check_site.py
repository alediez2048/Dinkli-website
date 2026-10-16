#!/usr/bin/env python3
"""Static checks for the Dinkli site.

- Every local href/src (and https://www.dinkli.com/... URL) resolves to a real file, with exact case.
- Every #fragment points at an existing id (in HTML pages and SVG sprites).
- No banned marketing claims appear in visible copy (HTML text nodes and SVG <text>).
- Illustration SVGs are valid XML and under the size budget.

Usage: python3 scripts/check_site.py
Exits non-zero when any error is found.
"""
import os
import re
import sys
import xml.dom.minidom
from html.parser import HTMLParser
from urllib.parse import unquote, urlsplit

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
SITE_URL = 'https://www.dinkli.com/'
SKIP_DIRS = {'.git', '.github', 'docs', 'scripts', 'node_modules', '_site', 'Dinkli Screenshots'}
ILLUSTRATION_DIR = os.path.join(ROOT, 'images', 'illustrations')
SVG_MAX_BYTES = 60 * 1024

BANNED = re.compile(
    r'\b(the )?first (ai|platform|pickleball|to)\b'
    r'|\bonly (platform|one|tool)\b'
    r'|\bno other\b'
    r'|#1\b'
    r'|\d+(\.\d+)?\s?%'
    r'|\bguaranteed\b'
    r'|\baccura(te|cy)\b'
    r'|DUPR-certified',
    re.IGNORECASE,
)

errors = []


def rel(path):
    return os.path.relpath(path, ROOT)


def exists_exact_case(path):
    """True if path exists and every segment matches the on-disk case (Linux-style)."""
    path = os.path.abspath(path)
    if not path.startswith(ROOT):
        return False
    current = ROOT
    for part in os.path.relpath(path, ROOT).split(os.sep):
        if part in ('', '.'):
            continue
        try:
            entries = os.listdir(current)
        except (NotADirectoryError, FileNotFoundError):
            return False
        if part not in entries:
            return False
        current = os.path.join(current, part)
    return os.path.exists(current)


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = set()
        self.refs = []  # (attr value, line)
        self.text = []  # (text, line)
        self._skip_depth = 0

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag in ('script', 'style'):
            self._skip_depth += 1
        if attrs.get('id'):
            self.ids.add(attrs['id'])
        line = self.getpos()[0]
        for name in ('href', 'src', 'xlink:href'):
            if attrs.get(name):
                self.refs.append((attrs[name], line))
        if tag == 'meta' and (attrs.get('content') or '').startswith(SITE_URL):
            self.refs.append((attrs['content'], line))

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag in ('script', 'style'):
            self._skip_depth -= 1

    def handle_endtag(self, tag):
        if tag in ('script', 'style') and self._skip_depth:
            self._skip_depth -= 1

    def handle_data(self, data):
        if not self._skip_depth and data.strip():
            self.text.append((data, self.getpos()[0]))


_page_cache = {}


def parse_page(path):
    if path not in _page_cache:
        parser = PageParser()
        with open(path, encoding='utf-8') as f:
            parser.feed(f.read())
        _page_cache[path] = parser
    return _page_cache[path]


def svg_ids(path):
    with open(path, encoding='utf-8') as f:
        return set(re.findall(r'\bid="([^"]+)"', f.read()))


def resolve(page, ref):
    """Return (local file path or None, fragment) for a reference; None path means 'not local'."""
    if ref.startswith(SITE_URL):
        ref = '/' + ref[len(SITE_URL):]
    parts = urlsplit(ref)
    if parts.scheme or parts.netloc or ref.startswith(('mailto:', 'tel:', 'data:', 'javascript:')):
        return None, None
    path = unquote(parts.path)
    fragment = unquote(parts.fragment)
    if not path:
        return page, fragment
    if path.startswith('/'):
        target = os.path.join(ROOT, path.lstrip('/'))
    else:
        target = os.path.join(os.path.dirname(page), path)
    if path.endswith('/') or os.path.isdir(target):
        target = os.path.join(target, 'index.html')
    return os.path.normpath(target), fragment


def check_page(page):
    parser = parse_page(page)
    for ref, line in parser.refs:
        if ref == '#':
            continue
        target, fragment = resolve(page, ref)
        if target is None:
            continue
        where = f'{rel(page)}:{line}'
        if not exists_exact_case(target):
            errors.append(f'{where} broken reference "{ref}" -> {rel(target)}')
            continue
        if fragment:
            if target.endswith('.html'):
                ids = parse_page(target).ids
            elif target.endswith('.svg'):
                ids = svg_ids(target)
            else:
                continue
            if fragment not in ids:
                errors.append(f'{where} missing anchor "#{fragment}" in {rel(target)}')
    for text, line in parser.text:
        match = BANNED.search(text)
        if match:
            errors.append(f'{rel(page)}:{line} banned claim "{match.group(0)}" in: {text.strip()[:80]}')


def check_svg(path):
    size = os.path.getsize(path)
    if size > SVG_MAX_BYTES:
        errors.append(f'{rel(path)} is {size} bytes (budget {SVG_MAX_BYTES})')
    try:
        doc = xml.dom.minidom.parse(path)
    except Exception as exc:  # noqa: BLE001 - report any parse failure
        errors.append(f'{rel(path)} is not valid XML: {exc}')
        return
    for node in doc.getElementsByTagName('text') + doc.getElementsByTagName('tspan'):
        content = ''.join(child.data for child in node.childNodes if child.nodeType == child.TEXT_NODE)
        match = BANNED.search(content)
        if match:
            errors.append(f'{rel(path)} banned claim "{match.group(0)}" in: {content.strip()[:80]}')


def shipped_pages():
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for name in filenames:
            if name.endswith('.html'):
                yield os.path.join(dirpath, name)


def main():
    pages = sorted(shipped_pages())
    for page in pages:
        check_page(page)
    svgs = []
    if os.path.isdir(ILLUSTRATION_DIR):
        svgs = sorted(os.path.join(ILLUSTRATION_DIR, n) for n in os.listdir(ILLUSTRATION_DIR) if n.endswith('.svg'))
        for svg in svgs:
            check_svg(svg)
    for err in errors:
        print(f'ERROR {err}')
    print(f'Checked {len(pages)} pages, {len(svgs)} illustrations: {len(errors)} error(s)')
    return 1 if errors else 0


if __name__ == '__main__':
    sys.exit(main())
