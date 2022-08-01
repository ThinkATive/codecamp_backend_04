import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BoardsModule } from './apis/boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './apis/products/products.module';
import { ConfigModule } from '@nestjs/config';
import { ProductSubCategoriesModule } from './apis/productsSubCategories/productSubCategories.module';
import { ProductMainCategoriesModule } from './apis/productsMainCategories/productMainCategories.module';
import { ProductBrandsModule } from './apis/brands/productBrands.module';
import { ProductBasketsModule } from './apis/baskets/productBaskets.module';
import { ProductSeasonsModule } from './apis/seasons/productSeasons.module';
import { UsersModule } from './apis/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    BoardsModule,
    ProductsModule,
    ProductBrandsModule,
    ProductBasketsModule,
    ProductSeasonsModule,
    ProductSubCategoriesModule,
    ProductMainCategoriesModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
  ],
})
export class AppModule {}
