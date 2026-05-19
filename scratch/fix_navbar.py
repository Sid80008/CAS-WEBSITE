
with open('components/layout/Navbar.tsx', encoding='utf-8') as f:
    lines = f.readlines()

# Find and remove the duplicate block (lines 18-26, 0-indexed: 17-25)
# They start with 'import { useScrolled }' and end with 'import { useLanguage }'
# We keep only the FIRST occurrence
seen_scrolled = False
out = []
skip_until_blank = False
for i, line in enumerate(lines):
    if 'import { useScrolled }' in line:
        if seen_scrolled:
            # This is the second occurrence - skip it and the next 9 lines
            skip_until_blank = True
            continue
        else:
            seen_scrolled = True
            out.append(line)
    elif skip_until_blank:
        # Skip until we hit a blank line or the ABOUT_LINKS const
        if line.strip() == '' or line.strip().startswith('const ABOUT_LINKS'):
            skip_until_blank = False
            out.append(line)
        # else skip
    else:
        out.append(line)

with open('components/layout/Navbar.tsx', 'w', encoding='utf-8') as f:
    f.writelines(out)

print(f'Done, removed duplicates. Total lines: {len(out)}')
