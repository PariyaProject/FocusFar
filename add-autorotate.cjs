const fs = require('fs');
const dir = './src/i18n/locales';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

files.forEach(file => {
  const p = `${dir}/${file}`;
  let content = fs.readFileSync(p, 'utf8');
  
  if (content.includes('autoRotate:')) return;
  
  let autoRotateStr = "'Click to Auto Rotate'";
  if (file === 'zh-CN.ts') {
    autoRotateStr = "'点击自动横屏 (全屏)'";
  } else if (file === 'zh-TW.ts') {
    autoRotateStr = "'點擊自動橫向 (全螢幕)'";
  } else if (file === 'ja-JP.ts') {
    autoRotateStr = "'クリックして自動回転（全画面）'";
  } else if (file === 'ko-KR.ts') {
    autoRotateStr = "'자동 회전 (전체 화면)'";
  } else if (file === 'es-ES.ts') {
    autoRotateStr = "'Rotar automáticamente'";
  } else if (file === 'fr-FR.ts') {
    autoRotateStr = "'Pivoter automatiquement'";
  } else if (file === 'de-DE.ts') {
    autoRotateStr = "'Automatisch drehen'";
  }
  
  content = content.replace(/(rotate:\s*\{[\s\S]*?desc:\s*.*?)(\n\s*\})/m, `$1,\n      autoRotate: ${autoRotateStr}$2`);
  fs.writeFileSync(p, content);
});
console.log('done');
