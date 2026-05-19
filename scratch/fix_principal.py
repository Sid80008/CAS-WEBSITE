import re

with open('app/about/principal-message/page.tsx', encoding='utf-8') as f:
    content = f.read()

# Add onError to principal photo
content = content.replace(
    'src="/gallery/photo-dump/1741578082-2.jpg" \r\n              />',
    'src="/gallery/photo-dump/1741578082-2.jpg"\r\n                 onError={(e: any) => { e.currentTarget.src = "/placeholder.png"; e.currentTarget.onerror = None; }}\r\n              />'
)
# Try LF variant too
content = content.replace(
    'src="/gallery/photo-dump/1741578082-2.jpg" \n              />',
    'src="/gallery/photo-dump/1741578082-2.jpg"\n                 onError={(e: any) => { e.currentTarget.src = "/placeholder.png"; e.currentTarget.onerror = None; }}\n              />'
)
# Fix None -> null (Python wrote None)
content = content.replace('onerror = None', 'onerror = null')

# Remove fake Wikipedia signature
content = re.sub(
    r'\s*<img\s+alt="Signature"\s+className="h-16 mt-2 opacity-80"\s+src="https://upload\.wikimedia\.org[^"]+"\s+/>',
    '',
    content
)

with open('app/about/principal-message/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done')
