const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1200, height: 800 });
  await page.goto('http://localhost:5173/training', { waitUntil: 'networkidle0' });
  
  // wait for canvas to render
  await new Promise(r => setTimeout(r, 2000));
  
  // Try to click the confirm button
  try {
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const confirmBtn = buttons.find(b => b.textContent.includes('我已经看到'));
      if (confirmBtn) confirmBtn.click();
    });
    await new Promise(r => setTimeout(r, 1000));
  } catch (e) {
    console.log(e);
  }
  
  // Wait for dynamic phase to start
  await new Promise(r => setTimeout(r, 2000));

  await page.screenshot({ path: '/Users/wuzhao/.gemini/antigravity/brain/c2f92824-4162-4689-9a8b-8a776bab530a/scratch/desktop_clear.png' });
  
  await page.setViewport({ width: 800, height: 400 });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: '/Users/wuzhao/.gemini/antigravity/brain/c2f92824-4162-4689-9a8b-8a776bab530a/scratch/mobile_landscape_clear.png' });
  
  // Let's also check 3D mode
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn3d = buttons.find(b => b.textContent.includes('3D'));
    if (btn3d) btn3d.click();
  });
  await page.goto('http://localhost:5173/training', { waitUntil: 'networkidle0' });
  
  await new Promise(r => setTimeout(r, 2000));
  try {
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const confirmBtn = buttons.find(b => b.textContent.includes('我已经看到'));
      if (confirmBtn) confirmBtn.click();
    });
  } catch (e) {}
  
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: '/Users/wuzhao/.gemini/antigravity/brain/c2f92824-4162-4689-9a8b-8a776bab530a/scratch/mobile_landscape_3d.png' });

  await browser.close();
  console.log("Screenshots saved.");
})();
