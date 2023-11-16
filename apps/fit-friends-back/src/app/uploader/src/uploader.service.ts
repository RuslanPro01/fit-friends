import { uploaderConfig } from '@fit-friends/configs/config-uploader';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ensureDir, writeFile } from 'fs-extra';
import crypto from 'node:crypto';
import dayjs from 'dayjs';
import { extension } from 'mime-types';
import { File } from '@fit-friends/shared/app-types';
import { FileEntity } from './file.entity';
import { UploaderRepository } from './uploader.repository';

@Injectable()
export class UploaderService {
  constructor(
    @Inject(uploaderConfig.KEY) private readonly uploaderConf: ConfigType<typeof uploaderConfig>,
    private readonly uploaderRepository: UploaderRepository
  ) {}

  private async uploadFile(file: Express.Multer.File): Promise<File> {
    const uploadDir = this.uploaderConf.uploadDir;

    const [year, month] = dayjs().format('YYYY-MM').split('-');
    const subDir = `${year}/${month}`;
    const hash = crypto.randomUUID();
    const fileExtension = extension(file.mimetype);
    const hashName = `${hash}.${fileExtension}`;

    const uploadDirectoryPath = `${uploadDir}/${subDir}`;
    const destinationFile = `${uploadDirectoryPath}/${hashName}`;

    await ensureDir(uploadDirectoryPath);
    await writeFile(destinationFile, file.buffer);

    return {
      hashName: hashName,
      mimetype: file.mimetype,
      path: `${subDir}/${hashName}`,
      size: file.size,
      originalName: file.originalname,
    };
  }

  public async saveFile(file: Express.Multer.File) {
    const writtenFile = await this.uploadFile(file);
    const newFile = new FileEntity(writtenFile);
    return this.uploaderRepository.create(newFile);
  }

  public async showFile(id: string) {
    const file = await this.uploaderRepository.findById(id);
    if (!file) {
      throw new NotFoundException(`File with ${id} not found`);
    }
    return file;
  }
}
