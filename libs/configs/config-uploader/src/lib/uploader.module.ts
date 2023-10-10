import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import uploaderConfig from './uploader.config';

const ENV_FILE_PATH = 'apps/fit-friends-back/env/.uploader.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [uploaderConfig],
      envFilePath: ENV_FILE_PATH,
      isGlobal: true,
      cache: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class UploaderModule {}
