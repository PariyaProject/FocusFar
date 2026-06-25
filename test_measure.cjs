const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  await page.setViewport({ width: 1200, height: 800 });
  await page.goto('http://localhost:5173/training', { waitUntil: 'networkidle0' });
  
  await new Promise(r => setTimeout(r, 2000));
  
  await page.setViewport({ width: 800, height: 400 });
  await new Promise(r => setTimeout(r, 1000));
  
  await page.setViewport({ width: 400, height: 800 });
  await new Promise(r => setTimeout(r, 1000));

  await browser.close();
})();
