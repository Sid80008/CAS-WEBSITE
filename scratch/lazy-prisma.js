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
            
            // 1. Remove static import
            if (content.includes("import { prisma } from '@/lib/prisma'")) {
                content = content.replace("import { prisma } from '@/lib/prisma'", "// Lazy prisma import added inside handlers");
                
                // 2. Inject lazy import into each exported async function (GET, POST, PUT, DELETE, PATCH)
                const verbs = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
                verbs.forEach(verb => {
                    const regex = new RegExp(`export async function ${verb}\\s*\\(`, 'g');
                    content = content.replace(regex, `export async function ${verb}(`);
                    
                    // Simple injection after the start of the function body
                    const bodyRegex = new RegExp(`export async function ${verb}\\s*\\([^)]*\\)\\s*\\{`, 'g');
                    content = content.replace(bodyRegex, (match) => `${match}\n    const { prisma } = await import('@/lib/prisma');`);
                });
                
                fs.writeFileSync(fullPath, content);
                console.log(`Lazy-fied ${fullPath}`);
            }
        }
    });
}

walk('./app/api');
