const fs = require('fs');
const path = require('path');

function getFiles(dir, files_) {
    files_ = files_ || [];
    const files = fs.readdirSync(dir);
    for (let i in files) {
        const name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()) {
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}

const directoryPath = path.join(__dirname, 'build');
const files = getFiles(directoryPath);
const clearedFiles = files
  .map(file => file.split(directoryPath)[1])
  .filter(file => file !== '/sw.js');
console.log(__dirname)
console.log(clearedFiles);

const SW_FILE = 'build/sw.js';
const data = fs.readFileSync(SW_FILE, 'utf8');
const result = data.replace(/cache.addAll\(\[\]\);/g, `
  cache.addAll(${JSON.stringify(clearedFiles)});
`);
fs.writeFileSync(SW_FILE, result, 'utf8');
