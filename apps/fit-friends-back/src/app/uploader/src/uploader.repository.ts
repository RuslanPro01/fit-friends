import { PrismaService } from '../../prisma/prisma.service';
import { FileEntity } from './file.entity';

export class UploaderRepository {
  constructor(private readonly primsa: PrismaService) {}

  public async create(file: FileEntity) {
    return this.primsa.file.create({
      data: file.toObject(),
    });
  }

  public async findById(id: string) {
    return this.primsa.file.findUnique({
      where: {
        id,
      },
    });
  }
}
