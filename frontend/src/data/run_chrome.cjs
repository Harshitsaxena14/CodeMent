const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const run = async () => {
  const profileDir = path.join(__dirname, 'chrome_guest_profile');
  
  const captureWithProfile = (url, filename) => {
    return new Promise((resolve) => {
      const outputPath = path.join(__dirname, filename);
      const args = [
        '--headless=new',
        '--no-sandbox',
        '--disable-gpu',
        `--user-data-dir=${profileDir}`,
        `--screenshot=${outputPath}`,
        '--window-size=1280,1000',
        url
      ];
      const chrome = spawn(chromePath, args);
      chrome.on('close', () => resolve());
    });
  };

  // 1. Visit guest_trigger.html to write localStorage "guestMode": "true"
  console.log('Writing guestMode localStorage flag in Chrome...');
  await captureWithProfile('http://localhost:5173/guest_trigger.html', 'trigger_run.png');
  
  // 2. Load profile page directly
  console.log('Capturing guest mode profile...');
  await captureWithProfile('http://localhost:5173/profile', 'profile_guest.png');
  
  console.log('All captures complete.');
};

run();
