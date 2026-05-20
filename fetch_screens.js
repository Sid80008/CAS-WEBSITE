const fs = require('fs');
const https = require('https');
const path = require('path');

const urls = {
  'app/portal/student/fees/page.tsx': 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzNlZTVlZTBkMjRkYzQyNmY4YWEzOTk0NzJmZDVjNzU3EgsSBxDMmMzS2QwYAZIBJAoKcHJvamVjdF9pZBIWQhQxMDg5MTg0NTE5MDc4NDUzNDY1OA&filename=&opi=96797242',
  'app/portal/student/circulars/page.tsx': 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzEyN2M1MDc1MmM4NjRiNzY5MTk0MTdiZDViYjI3NmExEgsSBxDMmMzS2QwYAZIBJAoKcHJvamVjdF9pZBIWQhQxMDg5MTg0NTE5MDc4NDUzNDY1OA&filename=&opi=96797242',
  'app/portal/parent/performance/page.tsx': 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzQ2OWE1NzRiM2ZjOTQ2YTVhOWIwMDk0MGFkNzEzYWY3EgsSBxDMmMzS2QwYAZIBJAoKcHJvamVjdF9pZBIWQhQxMDg5MTg0NTE5MDc4NDUzNDY1OA&filename=&opi=96797242',
  'app/portal/parent/fees/page.tsx': 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2FiNmE3ZWUyZjBiZTRiYTliZmM0MzA2ZTZlNWUxMmRlEgsSBxDMmMzS2QwYAZIBJAoKcHJvamVjdF9pZBIWQhQxMDg5MTg0NTE5MDc4NDUzNDY1OA&filename=&opi=96797242',
  'app/portal/parent/connect/page.tsx': 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzgwZGZjY2QyNjFiZTRlNDdiZDE0OWU2NTYyYTA5NWI2EgsSBxDMmMzS2QwYAZIBJAoKcHJvamVjdF9pZBIWQhQxMDg5MTg0NTE5MDc4NDUzNDY1OA&filename=&opi=96797242'
};

async function download(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  for (const [file, url] of Object.entries(urls)) {
    const fullPath = path.join(process.cwd(), file);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    
    let html = await download(url);
    
    // Basic JSX conversion
    html = html.replace(/class=/g, 'className=');
    html = html.replace(/for=/g, 'htmlFor=');
    html = html.replace(/<!--[\s\S]*?-->/g, '');
    
    // Extract body content if present
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (bodyMatch) {
      html = bodyMatch[1];
    }
    
    // Auto-close void tags
    html = html.replace(/<(img|input|br|hr|link|meta|area|base|col|param|source|track|wbr)([^>]*?)(?<!\/)>/g, '<$1$2 />');
    
    // Fix styles
    html = html.replace(/style="([^"]*)"/g, (match, p1) => {
      const styles = {};
      p1.split(';').forEach(s => {
        if (!s.trim()) return;
        let [key, val] = s.split(':');
        if (!key || !val) return;
        key = key.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        styles[key] = val.trim();
      });
      return `style={${JSON.stringify(styles)}}`;
    });

    const jsx = `import React from "react";\nimport { LucideIcon } from "lucide-react";\n\nexport default function Page() {\n  return (\n    <main>\n      ${html}\n    </main>\n  );\n}\n`;
    
    fs.writeFileSync(fullPath, jsx);
    console.log('Saved', file);
  }
}

run();
