const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/i18n/locales');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  if (!content.includes('rotate: {')) {
    const isZh = file.startsWith('zh');
    const title = isZh ? '请将手机横屏握持' : 'Please rotate your device';
    const desc = isZh ? '为了获得足够的双眼间距，请旋转手机至横屏模式进行训练。如果开启了方向锁定，请暂时关闭。' : 'Please rotate your device to landscape mode to get enough inter-pupillary distance for training. Disable orientation lock if needed.';
    
    const insertStr = `
    rotate: {
      title: '${title}',
      desc: '${desc}'
    },`;
    
    // Insert inside training: {
    content = content.replace(/training: \{/, 'training: {' + insertStr);
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
});
