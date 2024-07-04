import { Injectable } from '@nestjs/common';
import { ProductsService } from './../products/products.service';
import { initialData } from './data/data.seed';

@Injectable()
export class SeedService {
  constructor(private readonly productsService: ProductsService) {}

  async populateDatabase() {
    await this.productsService.deleteAllProducts();

    const products = initialData.products;
    const insertPromises = [];
    products.forEach((product) => {
      insertPromises.push(this.productsService.create(product));
    });
    await Promise.all(insertPromises);

    return `This action returns all seed`;
  }
}
