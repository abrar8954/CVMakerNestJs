import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { CvMakerService } from 'src/services/cv-maker.service';
import { Response } from 'express';
@Controller('cv-maker')
export class CvMakerController {
  constructor(private readonly cvMakerService: CvMakerService) {}

  @Post('/generate-cv')
  async generateCv(@Res() res: Response, @Body() body: any) {
    try {
      const getBuffer = (updatedPdfBuffer: any) => {
        // res.setHeader('Content-Type', 'application/pdf');
        // res.setHeader('Content-Disposition', 'inline; filename=cv.pdf');
        res.send(updatedPdfBuffer);
      };
      await this.cvMakerService.generateCV(body, getBuffer);
    } catch (error) {
      res.status(500).json({ message: 'CV generation failed', error });
    }
  }

  @Get('/get-all-templates')
  async getAllCv(@Res() res: Response) {
    try {
      const allCv = await this.cvMakerService.getAllCv();
      res.status(200).json(allCv);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get all CV', error });
    }
  }
}
