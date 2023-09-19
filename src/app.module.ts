import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CvMakerController } from './controllers/cv-maker.controller';
import { CvMakerService } from './services/cv-maker.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController, CvMakerController],
  providers: [AppService, CvMakerService],
})
export class AppModule {}
