import { Injectable } from '@nestjs/common';
import { ProductsService } from './../products/products.service';
import { initialData } from './data/data.seed';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {
  constructor(
    private readonly productsService: ProductsService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  private async deleteTables() {
    await this.productsService.deleteAllProducts();

    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();
  }

  async populateDatabase() {
    await this.deleteTables();

    const users = initialData.users;
    const insertUsersPromises = [];
    users.forEach((user) => {
      insertUsersPromises.push(this.userRepository.create(user));
    });
    const usersDb = await this.userRepository.save(insertUsersPromises);

    const products = initialData.products;
    const insertProductsPromises = [];
    products.forEach((product) => {
      insertProductsPromises.push(
        this.productsService.create(product, usersDb[0]),
      );
    });
    await Promise.all(insertProductsPromises);

    return { ok: true, message: 'Seed successfully excecuted' };
  }
}
