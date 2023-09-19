const fs = require('fs');
const path = require('path');
// const nodeHtmlToImage = require('node-html-to-image');
const puppeteer = require('puppeteer');
async function readTemplates() {
  const dummyDetails = {
    name: 'John Doe',
    age: '30',
    address: '123 Main St, New York, NY 10030',
  };
  const directoryPath = path.join(__dirname, 'src', 'templates/html');
  try {
    const fileNames = fs.readdirSync(directoryPath);
    for (let index = 0; index < fileNames.length; index++) {
      const fileName = fileNames[index];
      const filePath = path.join(directoryPath, fileName);
      let fileContent = fs.readFileSync(filePath, 'utf-8');
      Object.keys(dummyDetails).forEach((key) => {
        fileContent = fileContent.replace(`{${key}}`, dummyDetails[key]);
      });
      const browser = await puppeteer.launch({
        headless: 'new',
      });

      // Create a new page
      const page = await browser.newPage();
      await page.setContent(fileContent);
      const screenshotOptions = {
        fullPage: true, // Capture the entire page
      };
      const screenshotBuffer = await page.screenshot(screenshotOptions);
      await browser.close();
      fs.writeFileSync(`./public/screenshots/${fileName.split('.')[0]}.png`, screenshotBuffer);
      // await nodeHtmlToImage({
      //   output: `./public/screenshots/${fileName.split('.')[0]}.png`,
      //   html: fileContent,
      // });

    }
  } catch (error) {
    console.error('Error reading templates:', error);
  }
}
readTemplates();

