import re

with open('app/facilities/FacilitiesContent.tsx', encoding='utf-8') as f:
    content = f.read()

# Add 'use client' at top if not already there
use_client = '"use client";\r\n\r\n'
if not content.startswith('"use client"'):
    content = use_client + content

# Remove metadata import line
content = content.replace('import type { Metadata } from "next";\r\n', '')
content = content.replace('import type { Metadata } from "next";\n', '')

# Remove metadata export block (multi-line)
content = re.sub(r'export const metadata.*?\};\r?\n\r?\n', '', content, flags=re.DOTALL)

# Rename default export to named export
content = content.replace(
    'export default function Facilities()',
    'export function FacilitiesContent()'
)

with open('app/facilities/FacilitiesContent.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done')
