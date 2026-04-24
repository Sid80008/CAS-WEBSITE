const fs = require('fs');
const path = require('path');

function walk(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (file === 'route.ts') {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes('export const runtime = "nodejs";') && !content.includes("export const dynamic = 'force-dynamic';")) {
                content = content.replace('export const runtime = "nodejs";', "export const runtime = \"nodejs\";\nexport const dynamic = 'force-dynamic';");
                fs.writeFileSync(fullPath, content);
                console.log(`Updated ${fullPath}`);
            }
        }
    });
}

walk('./app/api');
