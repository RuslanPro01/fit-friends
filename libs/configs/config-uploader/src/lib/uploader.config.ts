import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export interface UploaderConfig {
  uploadDir: string;
}

export default registerAs('uploader', (): UploaderConfig => {
  const config: UploaderConfig = {
    uploadDir: process['env']['UPLOAD_DIR'] || '',
  };

  const validationSchema = Joi.object<UploaderConfig>({
    uploadDir: Joi.string().required(),
  });

  const { error } = validationSchema.validate(config);

  if (error) {
    throw new Error(`Invalid uploader config: ${error.message}. Please check your .env file.`);
  }

  return config;
});
