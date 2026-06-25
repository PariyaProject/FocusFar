const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'src/i18n/locales');
const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.ts'));

files.forEach(file => {
  const filePath = path.join(localesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  let newDesc = "'用于计算真实的物理像素比'";
  if (file === 'zh-CN.ts') {
    newDesc = "'手机通常约 6.1-6.8，电脑通常为 24-27。受浏览器限制，此项必须手动填写'";
  } else if (file === 'zh-TW.ts') {
    newDesc = "'手機通常約 6.1-6.8，電腦通常為 24-27。受瀏覽器限制，此項必須手動填寫'";
  } else if (file === 'en-US.ts') {
    newDesc = "'Phones: ~6.1-6.8, Monitors: 24-27. Must be set manually due to browser limits'";
  } else if (file === 'ja-JP.ts') {
    newDesc = "'スマホ：約6.1〜6.8、PC：24〜27。ブラウザ制限のため手動入力が必要です'";
  } else if (file === 'ko-KR.ts') {
    newDesc = "'스마트폰: 약 6.1-6.8, 모니터: 24-27. 브라우저 제한으로 수동 입력 필수'";
  } else if (file === 'es-ES.ts') {
    newDesc = "'Móviles: ~6.1-6.8, Monitores: 24-27. Manual debido a límites del navegador'";
  } else if (file === 'fr-FR.ts') {
    newDesc = "'Mobiles : ~6.1-6.8, Écrans : 24-27. Manuel en raison des limites du navigateur'";
  } else if (file === 'de-DE.ts') {
    newDesc = "'Handys: ~6.1-6.8, Monitore: 24-27. Manuell aufgrund von Browser-Limits'";
  }

  content = content.replace(/screenDesc:\s*'.*?'/g, `screenDesc: ${newDesc}`);
  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Descriptions updated!');
