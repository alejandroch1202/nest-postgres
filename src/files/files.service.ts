import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  async uploadProductImage() {
    return 'Image uploaded successfully';
  }
}
