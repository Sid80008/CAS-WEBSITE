const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function run(cmd) {
  try {
    console.log(`Running: ${cmd}`);
    return execSync(cmd, { stdio: 'inherit' });
  } catch (e) {
    console.error(`Failed: ${cmd}`);
    return null;
  }
}

const folders = ['public/gallery', 'SCREENS/new_screens'];
const CHUNK_SIZE = 5;

folders.forEach(folder => {
  const fullPath = path.join(process.cwd(), folder);
  if (!fs.existsSync(fullPath)) return;

  const files = [];
  function getFiles(dir) {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat && stat.isDirectory()) {
        getFiles(filePath);
      } else {
        files.push(path.relative(process.cwd(), filePath));
      }
    });
  }
  getFiles(fullPath);

  console.log(`Found ${files.length} files in ${folder}`);

  for (let i = 0; i < files.length; i += CHUNK_SIZE) {
    const chunk = files.slice(i, i + CHUNK_SIZE);
    chunk.forEach(file => run(`git add "${file}"`));
    run(`git commit -m "chore: upload chunk ${i / CHUNK_SIZE}"`);
    let success = run(`git push origin main`);
    if (!success) {
      console.log('Chunk push failed, retrying once...');
      run(`git push origin main`);
    }
  }
});
