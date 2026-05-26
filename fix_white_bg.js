const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  try {
    fs.readdirSync(dir).forEach(file => {
      const dirFile = path.join(dir, file);
      try {
        if (fs.statSync(dirFile).isDirectory()) {
          filelist = walkSync(dirFile, filelist);
        } else {
          filelist.push(dirFile);
        }
      } catch (err) { }
    });
  } catch (err) { }
  return filelist;
};

const files = walkSync('src/app').concat(walkSync('src/components'))
  .filter(f => f.endsWith('.css') || f.endsWith('.tsx') || f.endsWith('.ts'));

// Patterns that indicate card/component background (white)
// Only replace standalone white values, not white as part of text color
const replacements = [
  // background: white  or  background-color: white
  { regex: /(\bbackground(?:-color)?\s*:\s*)white\b/gi, replacement: '$1var(--bg-card)' },
  // background: #ffffff  or  background-color: #ffffff  (any case)
  { regex: /(\bbackground(?:-color)?\s*:\s*)#ffffff\b/gi, replacement: '$1var(--bg-card)' },
  // background: #fff   (shorthand)
  { regex: /(\bbackground(?:-color)?\s*:\s*)#fff\b/gi, replacement: '$1var(--bg-card)' },
];

// Skip: globals.css itself (we don't want to replace inside :root or body)
const SKIP_FILES = [
  'globals.css',
  'FloatingSidebar.module.css',  // has glassmorphism white
];

let changedCount = 0;
files.forEach(file => {
  const basename = path.basename(file);
  if (SKIP_FILES.some(s => basename === s)) return;

  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;

  // For .css files: replace background whites
  if (file.endsWith('.css')) {
    replacements.forEach(({ regex, replacement }) => {
      newContent = newContent.replace(regex, replacement);
    });
  }

  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    changedCount++;
    console.log('Updated: ' + file);
  }
});

console.log('\nTotal files updated: ' + changedCount);
