import { Module } from '@nestjs/common';
import { UploaderModule } from '@fit-friends/configs/config-uploader';

@Module({
  imports: [UploaderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
