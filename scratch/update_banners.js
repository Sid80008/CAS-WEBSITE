const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'app/about/leadership/page.tsx',
  'app/about/vision-mission/VisionMissionContent.tsx',
  'app/academics/page.tsx',
  'app/admissions/AdmissionsForm.tsx',
  'app/contact/ContactForm.tsx',
  'app/events/page.tsx',
  'app/facilities/FacilitiesContent.tsx',
  'app/facilities/art-culture/page.tsx',
  'app/facilities/labs/page.tsx',
  'app/facilities/library/page.tsx',
  'app/facilities/smart-classrooms/page.tsx',
  'app/facilities/sports/page.tsx',
  'app/facilities/transport/page.tsx',
  'app/gallery/page.tsx',
  'app/notices/page.tsx',
  'app/staff/page.tsx'
];

const basePath = 'c:/Users/siddh/OneDrive/Desktop/CODES/Projects/CAS website';

filesToUpdate.forEach(fileRelPath => {
  const fullPath = path.join(basePath, fileRelPath);
  if (!fs.existsSync(fullPath)) {
    console.log(`File not found: ${fullPath}`);
    return;
  }
  let content = fs.readFileSync(fullPath, 'utf8');

  // Replace imageSrc inside PageBanner
  let updatedContent = content.replace(/(<PageBanner[\s\S]*?imageSrc=")([^"]*)("[\s\S]*?\/>)/g, (match, prefix, oldSrc, suffix) => {
    console.log(`Updating banner in ${fileRelPath}: ${oldSrc} -> /banner-main.png`);
    return `${prefix}/banner-main.png${suffix}`;
  });

  // Specifically for leadership/page.tsx, also replace the principal portrait image
  if (fileRelPath === 'app/about/leadership/page.tsx') {
    const targetUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbi6VpC17o7iOEsdbeBnC2SwNhfwwNz8_9ydpDjTFbYi_NqpbndwxC4yccBwxuXXQHU6bmsjfH88pBU1myoLaGyIxxEUIJBo5nsc5A6zoELQtBqbziuzkkrQlYxY9HI0YBa_0bAWbuaqbVHpUs6-5yMgPmZ8LaHUIse7PWRxmW6RmKBw5eFTcLYk4JVlXdL0tnpxKiozW0vALo0LkGDcWCVgrgtDCvMh2T0iZUd3n6SlO1KZaLlU3SFJCgAfdt5NFDeGsmJojyQiQD';
    updatedContent = updatedContent.replace(targetUrl, '/principal-main.png');
    console.log(`Updating Principal portrait in ${fileRelPath}`);
  }

  if (content !== updatedContent) {
    fs.writeFileSync(fullPath, updatedContent, 'utf8');
    console.log(`Successfully updated ${fileRelPath}`);
  } else {
    console.log(`No changes made to ${fileRelPath}`);
  }
});
