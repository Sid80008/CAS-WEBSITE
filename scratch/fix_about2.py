
for item in [
    ('app/about/directors-message/DirectorContent.tsx', 'DirectorsMessage', 'DirectorContent'),
    ('app/about/principal-message/PrincipalContent.tsx', 'PrincipalMessage', 'PrincipalContent'),
]:
    fname, old_name, new_name = item
    with open(fname, encoding='utf-8') as f:
        content = f.read()
    content = content.replace(
        f'export default function {old_name}()',
        f'export function {new_name}()'
    )
    with open(fname, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Fixed: {fname}')
