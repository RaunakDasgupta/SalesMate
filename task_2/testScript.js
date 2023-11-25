const puppeteer = require('puppeteer');
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');
async function captureScreenRecording(url, outputPath) {
  const screenRecorderOptions = {
    followNewTab: true,
    fps: 25,
  };
  const screenRecorder = new PuppeteerScreenRecorder(url, screenRecorderOptions);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Open the page and wait for it to load
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  // Set up viewport
  await page.setViewport({ width: 1200, height: 800 }); // Adjust the values as needed

  // Start screen recording
  await screenRecorder.start(outputPath);
  console.log("hello");
  // Scroll the page to capture the entire content
  await autoScroll(page);

  // Stop screen recording
  await screenRecorder.stop();

  console.log(`Screen recording saved to: ${outputPath}`);

  await browser.close();
}

// Function to scroll the page automatically
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      let totalHeight = 0;
      const distance = 100; // scrolling distance
      const maxScrollAttempts = 500; // adjust as needed

      const scrollInterval = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (
          totalHeight >= document.body.scrollHeight ||
          maxScrollAttempts <= 0
        ) {
          clearInterval(scrollInterval);
          resolve();
        }

        maxScrollAttempts--;
      }, 100);
    });
  });
}

// Example usage
const url = 'https://www.interactly.video';
const outputPath = 'task_2/recording.mp4';

captureScreenRecording(url, outputPath)
  .then(() => console.log('Screen recording saved successfully'))
  .catch((error) => console.error('Error capturing screen recording:', error));
