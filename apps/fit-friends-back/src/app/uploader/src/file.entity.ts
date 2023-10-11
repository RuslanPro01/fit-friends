import { File } from '@fit-friends/shared/app-types';

export class FileEntity implements File {
  public id: string;
  public originalName: string;
  public size: number;
  public mimetype: string;
  public hashName: string;
  public path: string;

  constructor(file: File) {
    this.fillEntity(file);
  }

  public fillEntity(file: File) {
    this.id = file.id;
    this.originalName = file.originalName;
    this.size = file.size;
    this.mimetype = file.mimetype;
    this.hashName = file.hashName;
    this.path = file.path;
  }

  public toObject() {
    return { ...this };
  }
}
