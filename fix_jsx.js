const fs = require('fs');
const files = [
  'app/portal/student/fees/page.tsx',
  'app/portal/student/circulars/page.tsx',
  'app/portal/parent/performance/page.tsx',
  'app/portal/parent/fees/page.tsx',
  'app/portal/parent/connect/page.tsx'
];
files.forEach(f => {
  try {
    let content = fs.readFileSync(f, 'utf8');
    content = content.replace(/<script>[\s\S]*?<\/script>/g, '');
    content = content.replace(/<style>[\s\S]*?<\/style>/g, '');
    fs.writeFileSync(f, content);
    console.log('Fixed', f);
  } catch (e) {
    console.error('Error with', f, e.message);
  }
});
