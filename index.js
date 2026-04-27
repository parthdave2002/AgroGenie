const { execSync } = require('child_process');
const { existsSync } = require('fs');
const { resolve } = require('path');

const dirs = ['Backend', 'Frontend', 'Website'];

function installDependencies(dir) {
  const dirPath = resolve(__dirname, dir);
  const pkgPath = resolve(dirPath, 'package.json');

  if (!existsSync(pkgPath)) {
    console.log(`Skipping ${dir}: package.json not found.`);
    return;
  }

  console.log(`\n[${dir}] Installing node modules...`);
  execSync('npm install', {
    cwd: dirPath,
    stdio: 'inherit',
  });
}

(async function main() {
  console.log('Installing Node modules for Backend, Frontend, and Website...');

  try {
    for (const dir of dirs) {
      installDependencies(dir);
    }
    console.log('\nAll done.');
  } catch (error) {
    console.error('\nInstallation failed:', error.message || error);
    process.exit(1);
  }
})();
