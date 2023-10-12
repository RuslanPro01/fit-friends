import { Module } from '@nestjs/common';
import { UploaderModule } from './uploader/uploader.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UploaderModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
