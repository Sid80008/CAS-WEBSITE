const lucide = require('lucide-react');
const icons = ['Megaphone', 'Award', 'GraduationCap', 'Microscope', 'Palette', 'Bus', 'Shield', 'Users', 'Trophy'];
icons.forEach(icon => {
  console.log(`${icon}: ${lucide[icon] ? 'Exists' : 'MISSING'}`);
});
