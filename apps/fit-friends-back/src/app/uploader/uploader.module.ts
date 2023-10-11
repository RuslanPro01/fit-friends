import { Logger, Module } from '@nestjs/common';
import { UploaderController } from './src/uploader.controller';
import { UploaderService } from './src/uploader.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigService } from '@nestjs/config';
import { ConfigUploaderModule } from '@fit-friends/configs/config-uploader';
import { UploaderRepository } from './src/uploader.repository';
import { resolve } from 'node:path';

@Module({
  imports: [
    ConfigUploaderModule,
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const rootPath = configService.get<string>('uploader.uploadDir');
        const serveRoot = configService.get<string>('uploader.serveRoot');
        return [
          {
            rootPath,
            serveRoot: serveRoot,
          },
        ];
      },
    }),
  ],
  controllers: [UploaderController],
  providers: [UploaderService, UploaderRepository],
})
export class UploaderModule {}
