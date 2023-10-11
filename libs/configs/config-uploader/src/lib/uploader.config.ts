import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export interface UploaderConfig {
  uploadDir: string;
  serveRoot: string;
}

export default registerAs('uploader', (): UploaderConfig => {
  const config: UploaderConfig = {
    uploadDir: process['env']['UPLOAD_DIR'] || '',
    serveRoot: process['env']['SERVE_ROOT'] || '',
  };

  const validationSchema = Joi.object<UploaderConfig>({
    uploadDir: Joi.string().required(),
    serveRoot: Joi.string().required(),
  });

  const { error } = validationSchema.validate(config);

  if (error) {
    throw new Error(`Invalid uploader config:\n${error.message}. Please check your .env file.`);
  }

  return config;
});
