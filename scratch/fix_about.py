
for fname in ['app/about/directors-message/page.tsx', 'app/about/principal-message/page.tsx']:
    with open(fname, encoding='utf-8') as f:
        content = f.read()
    if not content.startswith('"use client"'):
        content = '"use client";\r\n\r\n' + content
    with open(fname, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Fixed: {fname}')
