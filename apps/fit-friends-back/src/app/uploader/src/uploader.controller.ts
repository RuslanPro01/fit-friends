import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import 'multer';
import { UploaderService } from './uploader.service';
import { File } from '@fit-friends/shared/app-types';

@Controller('uploads')
export class UploaderController {
  constructor(private readonly uploaderService: UploaderService) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<File> {
    return this.uploaderService.saveFile(file);
  }

  @Get('/:fileId')
  public async showFile(@Param('fileId') fileId: string) {
    return this.uploaderService.showFile(fileId);
  }
}
