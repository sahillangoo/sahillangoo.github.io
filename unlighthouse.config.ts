import fs from 'node:fs';

const CHROME_PATHS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium-browser',
];

const executablePath = CHROME_PATHS.find((p) => fs.existsSync(p));

export default {
  site: 'https://sahillangoo.in',
  scanner: {
    device: 'desktop',
    samples: 1,
    throttle: false,
    dynamicSampling: false,
  },
  ci: {
    budget: {
      performance: 90,
      accessibility: 95,
      'best-practices': 95,
      seo: 95,
    },
  },
  puppeteerClusterOptions: {
    maxConcurrency: 2,
    puppeteerOptions: {
      executablePath,
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
    },
  },
};
