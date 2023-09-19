import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
const puppeteer = require('puppeteer');
@Injectable()
export class CvMakerService {
  async generateCV(body: any, getBuffer: any): Promise<Uint8Array> {
    try {
      const { userDetails, templateName } = body;
      const directoryPath = path.join(
        'src',
        `templates/html/${templateName}.html`,
      );
      let cvHtml = fs.readFileSync(directoryPath, 'utf8');
      Object.keys(userDetails).forEach((key) => {
        cvHtml = cvHtml.replace(`{${key}}`, userDetails[key]);
      });
      const browser = await puppeteer.launch({
        headless: 'new',
      });

      // Create a new page
      const page = await browser.newPage();
      const viewportOptions = {
        width: 1920,
        height: 1600,
      };
      await page.setViewport(viewportOptions);
      await page.setContent(cvHtml);
      const pdfOptions = {
        width: '2020px', // Adjust the width as needed
        height: '1800px',
        path: 'public/pdfs/cv.pdf',
      };
      const pdfBuffer = await page.pdf(pdfOptions);
      // write pdf to file in public folder and send it in response
      // fs.writeFileSync('public/pdfs/cv.pdf', pdfBuffer);

      await browser.close();

      // await pdf.create(cvHtml, options).toBuffer(function (err, buffer) {
      getBuffer({ url: '/pdfs/cv.pdf' });
      // });
    } catch (e) {
      console.log(e, 'error in generateCV');
      return e;
    }
  }
  async getAllCv(): Promise<any> {
    try {
      const directoryPath = path.join('public', `screenshots/`);
      const files = fs.readdirSync(directoryPath).map((file) => {
        return {
          name: file.split('.')[0],
          url: `/screenshots/${file}`,
        };
      });
      return files;
    } catch (e) {
      console.log(e, 'error in getAllCv');
      return e;
    }
  }
}
