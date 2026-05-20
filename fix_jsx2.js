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
    // Remove all onClick="someString" since they are invalid in React
    content = content.replace(/onclick="[^"]*"/gi, '');
    content = content.replace(/onclick=\{[^}]*\}/gi, '');
    
    // Fix maxLength
    content = content.replace(/maxlength/gi, 'maxLength');
    
    // Fix tabIndex="0" to tabIndex={0}
    content = content.replace(/tabindex="([0-9\-]+)"/gi, 'tabIndex={$1}');
    
    // Some SVGs might have fill-opacity
    content = content.replace(/fill-opacity/gi, 'fillOpacity');

    fs.writeFileSync(f, content);
    console.log('Fixed more JSX in', f);
  } catch (e) {
    console.error('Error with', f, e.message);
  }
});
