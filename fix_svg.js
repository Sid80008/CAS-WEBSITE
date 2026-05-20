const fs = require('fs');
const files = [
  'app/portal/student/fees/page.tsx',
  'app/portal/student/circulars/page.tsx',
  'app/portal/parent/performance/page.tsx',
  'app/portal/parent/fees/page.tsx',
  'app/portal/parent/connect/page.tsx'
];

const replacements = {
  'preserveaspectratio': 'preserveAspectRatio',
  'viewbox': 'viewBox',
  '<lineargradient': '<linearGradient',
  '</lineargradient>': '</linearGradient>',
  'stop-color': 'stopColor',
  'stop-opacity': 'stopOpacity',
  'clip-path': 'clipPath',
  'stroke-width': 'strokeWidth',
  'stroke-linecap': 'strokeLinecap',
  'stroke-linejoin': 'strokeLinejoin',
  'stroke-dasharray': 'strokeDasharray',
  'stroke-dashoffset': 'strokeDashoffset',
  'fill-rule': 'fillRule',
  'clip-rule': 'clipRule'
};

files.forEach(f => {
  try {
    let content = fs.readFileSync(f, 'utf8');
    for (const [key, value] of Object.entries(replacements)) {
      content = content.replace(new RegExp(key, 'g'), value);
    }
    fs.writeFileSync(f, content);
    console.log('Fixed SVG in', f);
  } catch (e) {
    console.error('Error with', f, e.message);
  }
});
