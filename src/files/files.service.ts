import { join } from 'path';
import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FilesService {
  constructor(private readonly configService: ConfigService) {}

  async uploadProductImage(file: Express.Multer.File) {
    if (!file)
      throw new BadRequestException('Make sure that the file is an image');
    return {
      url: `${this.configService.get('HOST')}/files/product/${file.filename}`,
    };
  }

  findProductImage(imageName: string) {
    const path = join(__dirname, '..', '..', 'static', 'products', imageName);

    if (!existsSync(path))
      throw new BadRequestException('No product image found');

    return path;
  }
}
