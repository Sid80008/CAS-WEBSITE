
with open('app/facilities/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix 100% badge -> Safe Campus
content = content.replace(
    '>100%</h4>',
    '>Safe Campus</h4>'
)
content = content.replace(
    '>Secure Campus Environment</p>',
    '>CCTV \u2022 Trained Staff \u2022 Medical Room</p>'
)

# Replace alt="Safety" with alt+onError
content = content.replace(
    'alt="Safety" \r\n               />',
    'alt="CAS Campus"\r\n                 onError={(e: any) => { e.currentTarget.src = "/placeholder.png"; e.currentTarget.onerror = null; }}\r\n               />'
)

with open('app/facilities/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done')
