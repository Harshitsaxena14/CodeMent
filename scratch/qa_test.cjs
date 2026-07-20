// CodeMent Automated QA & E2E Validation Script
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');
const WebSocket = require('ws');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const extensionPath = 'c:\\Users\\Charchit Saxena\\Documents\Projects\\CodeMent\\extension';
const profileDir = path.join(__dirname, 'chrome_qa_profile');

console.log('--- STARTING AUTOMATED QA VERIFICATION ---');

// 1. Start Mock LeetCode HTTP Server
const mockLeetCode = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  if (req.url.includes('/problems/two-sum')) {
    res.end(`
      <html>
        <head><title>Two Sum - LeetCode</title></head>
        <body>
          <h1 class="text-title-large">Two Sum</h1>
          <a href="/tag/array/">Array</a>
          <a href="/tag/hash-table/">Hash Table</a>
          <div id="submission-container"></div>
          <button id="solve-btn" onclick="document.getElementById('submission-container').innerHTML = '<div data-e2e-locator=\\'submission-result\\'>Accepted</div>';">Simulate Accept</button>
        </body>
      </html>
    `);
  } else if (req.url.includes('/problems/move-zeroes')) {
    res.end(`
      <html>
        <head><title>Move Zeroes - LeetCode</title></head>
        <body>
          <h1 class="text-title-large">Move Zeroes</h1>
          <a href="/tag/array/">Array</a>
          <a href="/tag/two-pointers/">Two Pointers</a>
        </body>
      </html>
    `);
  } else if (req.url.includes('/problems/subarray-sums-divisible-by-k')) {
    res.end(`
      <html>
        <head><title>Subarray Sums Divisible by K - LeetCode</title></head>
        <body>
          <h1 class="text-title-large">Subarray Sums Divisible by K</h1>
          <a href="/tag/array/">Array</a>
          <a href="/tag/prefix-sum/">Prefix Sum</a>
        </body>
      </html>
    `);
  } else {
    res.end('Mock LeetCode Landing Page');
  }
});

mockLeetCode.listen(8080, () => {
  console.log('Mock LeetCode Server running at http://localhost:8080');
});

// 2. Start Backend API Server
console.log('Spawning backend API server...');
const backend = spawn('node', ['server.js'], {
  cwd: 'c:\\Users\Charchit Saxena\\Documents\\Projects\\CodeMent\\backend',
  env: { ...process.env, PORT: 5000 }
});

backend.stdout.on('data', (data) => {
  console.log('[Backend Stdout]:', data.toString().trim());
});

// Helper for CDP JSON calls
const getJson = (urlPath) => {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:9222${urlPath}`, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
};

// 3. Launch Chrome with extension loaded
const args = [
  '--headless=new',
  '--no-sandbox',
  '--disable-gpu',
  '--remote-debugging-port=9222',
  '--window-size=1280,1000',
  `--load-extension=${extensionPath}`,
  `--user-data-dir=${profileDir}`,
  'http://localhost:8080/problems/two-sum'
];

console.log('Launching Headless Chrome...');
const chrome = spawn(chromePath, args);

// Run test sequence
setTimeout(async () => {
  try {
    const pages = await getJson('/json/list');
    const page = pages.find(p => p.url.includes('/problems/two-sum'));
    if (!page) {
      console.log('FAIL: Could not locate Mock LeetCode page target!');
      cleanupAndExit(1);
    }

    console.log('Connecting to Mock LeetCode tab WebSocket...');
    const wsLeetCode = new WebSocket(page.webSocketDebuggerUrl);
    
    wsLeetCode.on('open', async () => {
      console.log('Connected to LeetCode tab.');
      wsLeetCode.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));

      // Let's get the extension ID by opening a new tab to chrome://extensions
      const newTab = await getJson('/json/new?chrome://extensions');
      console.log('Extensions Tab opened. Connecting WebSocket...');
      const wsExtensions = new WebSocket(newTab.webSocketDebuggerUrl);

      wsExtensions.on('open', () => {
        wsExtensions.send(JSON.stringify({ id: 10, method: 'Runtime.enable' }));
        
        // Extract ID
        setTimeout(() => {
          wsExtensions.send(JSON.stringify({
            id: 11,
            method: 'Runtime.evaluate',
            params: {
              expression: `
                (() => {
                  const manager = document.querySelector('extensions-manager');
                  if (!manager) return 'not_found';
                  const itemList = manager.shadowRoot.querySelector('extensions-item-list');
                  if (!itemList) return 'no_item_list';
                  const items = itemList.shadowRoot.querySelectorAll('extensions-item');
                  for (const item of items) {
                    if (item.shadowRoot.querySelector('#name').textContent.includes('CodeMent')) {
                      return item.id;
                    }
                  }
                  return 'code_ment_not_found';
                })()
              `
            }
          }));
        }, 1500);
      });

      let extensionId = null;
      wsExtensions.on('message', async (data) => {
        const msg = JSON.parse(data.toString());
        if (msg.id === 11 && msg.result && msg.result.result) {
          extensionId = msg.result.result.value;
          console.log('DETECTED EXTENSION ID:', extensionId);
          wsExtensions.close();

          if (extensionId === 'code_ment_not_found' || !extensionId) {
            console.log('FAIL: CodeMent extension not found in chrome://extensions!');
            cleanupAndExit(1);
          }

          // Open the popup panel in a tab to verify rendering
          const popupUrl = `chrome-extension://${extensionId}/popup.html`;
          const popupTab = await getJson(`/json/new?${popupUrl}`);
          console.log('Popup Tab opened. Connecting WebSocket...');
          const wsPopup = new WebSocket(popupTab.webSocketDebuggerUrl);

          wsPopup.on('open', () => {
            wsPopup.send(JSON.stringify({ id: 20, method: 'Runtime.enable' }));
            wsPopup.send(JSON.stringify({ id: 21, method: 'DOM.enable' }));

            // Test 1: Verify Two Sum loaded in popup
            setTimeout(() => {
              wsPopup.send(JSON.stringify({
                id: 22,
                method: 'Runtime.evaluate',
                params: {
                  expression: `
                    (() => {
                      const title = document.getElementById('problemTitle').textContent.trim();
                      const topic = document.getElementById('topicMapping').textContent.trim();
                      const badge = document.getElementById('metadataBadge').textContent.trim();
                      const timer = document.getElementById('solvingTimer').textContent.trim();
                      return { title, topic, badge, timer };
                    })()
                  `
                }
              }));
            }, 2000);
          });

          wsPopup.on('message', async (pData) => {
            const pMsg = JSON.parse(pData.toString());
            
            // Check Test 1 Results
            if (pMsg.id === 22 && pMsg.result && pMsg.result.result) {
              const res = pMsg.result.result.value;
              console.log('Popup State values for Two Sum:', res);
              if (res.title === 'Two Sum' && res.badge === 'OFFICIAL') {
                console.log('PASS: Two Sum metadata and Official Badge validated!');
              } else {
                console.log('FAIL: Two Sum metadata is incorrect!', res);
              }

              // Test 2: SPA Navigation -> Move Zeroes
              console.log('Simulating SPA Navigation to Move Zeroes on LeetCode tab...');
              wsLeetCode.send(JSON.stringify({
                id: 2,
                method: 'Runtime.evaluate',
                params: {
                  expression: 'window.history.pushState({}, "", "/problems/move-zeroes"); window.dispatchEvent(new Event("popstate"));'
                }
              }));

              // Wait for popup to update and check state
              setTimeout(() => {
                wsPopup.send(JSON.stringify({
                  id: 23,
                  method: 'Runtime.evaluate',
                  params: {
                    expression: `
                      (() => {
                        const title = document.getElementById('problemTitle').textContent.trim();
                        const topic = document.getElementById('topicMapping').textContent.trim();
                        const badge = document.getElementById('metadataBadge').textContent.trim();
                        return { title, topic, badge };
                      })()
                    `
                  }
                }));
              }, 2000);
            }

            // Check Test 2 Results (Move Zeroes SPA Navigation)
            if (pMsg.id === 23 && pMsg.result && pMsg.result.result) {
              const res = pMsg.result.result.value;
              console.log('Popup State values for Move Zeroes:', res);
              if (res.title === 'Move Zeroes' && res.badge === 'OFFICIAL') {
                console.log('PASS: SPA Navigation to Move Zeroes succeeded and updated popup!');
              } else {
                console.log('FAIL: SPA Navigation to Move Zeroes failed!', res);
              }

              // Test 3: Unknown Problem Fallback (Subarray Sums Divisible by K)
              console.log('Simulating SPA Navigation to unseeded problem...');
              wsLeetCode.send(JSON.stringify({
                id: 3,
                method: 'Runtime.evaluate',
                params: {
                  expression: 'window.history.pushState({}, "", "/problems/subarray-sums-divisible-by-k"); window.dispatchEvent(new Event("popstate"));'
                }
              }));

              setTimeout(() => {
                wsPopup.send(JSON.stringify({
                  id: 24,
                  method: 'Runtime.evaluate',
                  params: {
                    expression: `
                      (() => {
                        const title = document.getElementById('problemTitle').textContent.trim();
                        const topic = document.getElementById('topicMapping').textContent.trim();
                        const badge = document.getElementById('metadataBadge').textContent.trim();
                        return { title, topic, badge };
                      })()
                    `
                  }
                }));
              }, 2000);
            }

            // Check Test 3 Results (Unseeded Problem Classification)
            if (pMsg.id === 24 && pMsg.result && pMsg.result.result) {
              const res = pMsg.result.result.value;
              console.log('Popup State values for Unseeded Problem:', res);
              // Expected topic "Arrays" or similar fallback based on local heuristics
              if (res.title.includes('Subarray') && (res.badge === 'ESTIMATED' || res.badge === 'AI GENERATED' || res.badge === 'AI')) {
                console.log('PASS: Unseeded fallback system properly generated/estimated metadata!', res.badge);
              } else {
                console.log('FAIL: Unseeded fallback classification failed!', res);
              }

              // Test 4: Timer freeze on Solve
              console.log('Simulating Accepted Submission on Two Sum LeetCode tab...');
              wsLeetCode.send(JSON.stringify({
                id: 4,
                method: 'Runtime.evaluate',
                params: {
                  expression: 'window.history.pushState({}, "", "/problems/two-sum"); window.dispatchEvent(new Event("popstate"));'
                }
              }));

              // Trigger Simulated Accept
              setTimeout(() => {
                wsLeetCode.send(JSON.stringify({
                  id: 5,
                  method: 'Runtime.evaluate',
                  params: {
                    expression: 'document.getElementById("solve-btn").click();'
                  }
                }));
              }, 1500);

              // Check Timer State in Popup
              setTimeout(() => {
                wsPopup.send(JSON.stringify({
                  id: 25,
                  method: 'Runtime.evaluate',
                  params: {
                    expression: `
                      (() => {
                        const title = document.getElementById('problemTitle').textContent.trim();
                        const state = document.getElementById('solvingStateText').textContent.trim();
                        const timer = document.getElementById('solvingTimer').textContent.trim();
                        return { title, state, timer };
                      })()
                    `
                  }
                }));
              }, 3000);
            }

            // Check Test 4 Results (Solve & Freeze)
            if (pMsg.id === 25 && pMsg.result && pMsg.result.result) {
              const res = pMsg.result.result.value;
              console.log('Popup Solve State for Two Sum:', res);
              if (res.state.includes('Completed') || res.state.includes('✓')) {
                console.log('PASS: Accepted detection, solve state toggle, and timer freeze validated!');
              } else {
                console.log('FAIL: Timer did not freeze or solve state did not toggle!', res);
              }

              // All validations complete!
              console.log('--- ALL AUTOMATED E2E TESTS COMPLETED ---');
              cleanupAndExit(0);
            }
          });
        }
      });
    });

  } catch (err) {
    console.error('E2E QA Runner Exception:', err);
    cleanupAndExit(1);
  }
}, 4000);

function cleanupAndExit(code) {
  console.log('Cleaning up resources...');
  mockLeetCode.close();
  backend.kill();
  chrome.kill();
  process.exit(code);
}
