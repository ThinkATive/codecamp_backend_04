import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductColor } from '../colors/entities/color.entity';
import { ProductGender } from '../genders/entities/gender.entity';
import { ProductMaterial } from '../materials/entities/material.entity';
import { ProductSize } from '../sizes/entities/size.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(ProductMaterial)
    private readonly productMaterialRepository: Repository<ProductMaterial>,
    @InjectRepository(ProductColor)
    private readonly productColorRepository: Repository<ProductColor>,
    @InjectRepository(ProductSize)
    private readonly productSizeRepository: Repository<ProductSize>,
    @InjectRepository(ProductGender)
    private readonly productGenderRepository: Repository<ProductGender>,
  ) {}

  findAll() {
    return this.productsRepository.find({
      relations: [
        'productSubCategory',
        'productBrand',
        'productSeason',
        'productMaterials',
        `productColors`,
        `productSizes`,
        `productGenders`,
      ],
    });
  }

  findOne({ productId }) {
    return this.productsRepository.findOne({
      where: { id: productId },
      relations: [
        'productSubCategory',
        'productBrand',
        'productSeason',
        'productMaterials',
        `productColors`,
        `productSizes`,
        `productGenders`,
      ],
    });
  }

  findAllWithDeleted() {
    return this.productsRepository.find({
      withDeleted: true,
      relations: [
        'productSubCategory',
        'productBrand',
        'productSeason',
        'productMaterials',
        `productColors`,
        `productSizes`,
        `productGenders`,
      ],
    });
  }

  async create({ createProductInput }) {
    const {
      productBrandId,
      productSeasonId,
      productSubCategoryId,
      productMaterials,
      productColors,
      productSizes,
      productGenders,
      ...product
    } = createProductInput;

    const materialList = [];
    for (let i = 0; i < productMaterials.length; i++) {
      const prevMaterial = await this.productMaterialRepository.findOne({
        where: { material: productMaterials[i] },
      });

      if (prevMaterial) materialList.push(prevMaterial);
      else {
        const newMaterial = await this.productMaterialRepository.save({
          material: productMaterials[i],
        });
        materialList.push(newMaterial);
      }
    }

    const colorList = [];
    for (let i = 0; i < productColors.length; i++) {
      const prevColor = await this.productColorRepository.findOne({
        where: { color: productColors[i] },
      });

      if (prevColor) materialList.push(prevColor);
      else {
        const newColor = await this.productColorRepository.save({
          color: productColors[i],
        });
        colorList.push(newColor);
      }
    }

    const sizeList = [];
    for (let i = 0; i < productSizes.length; i++) {
      const prevSize = await this.productSizeRepository.findOne({
        where: { size: productSizes[i] },
      });

      if (prevSize) sizeList.push(prevSize);
      else {
        const newSize = await this.productSizeRepository.save({
          size: productSizes[i],
        });
        sizeList.push(newSize);
      }
    }

    const genderList = [];
    for (let i = 0; i < productGenders.length; i++) {
      const prevGender = await this.productGenderRepository.findOne({
        where: { gender: productGenders[i] },
      });

      if (prevGender) genderList.push(prevGender);
      else {
        const newGender = await this.productGenderRepository.save({
          gender: productGenders[i],
        });
        genderList.push(newGender);
      }
    }

    const result = await this.productsRepository.save({
      ...product,
      productBrand: { id: productBrandId },
      productSeason: { id: productSeasonId },
      productSubCategory: { id: productSubCategoryId },
      productMaterials: materialList,
      productColors: colorList,
      productGenders: genderList,
      productSizes: sizeList,
    });

    return result;
  }

  async checkStock({ productId }) {
    const product = await this.productsRepository.findOne({
      where: { id: productId },
    });

    if (!product.isStock)
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');
  }

  async update({ productId, updateProductInput }) {
    const currentProduct = await this.productsRepository.findOne({
      where: { id: productId },
    });

    return this.productsRepository.save({
      ...currentProduct,
      id: productId,
      ...updateProductInput,
    });
  }

  async delete({ productId }) {
    const result = await this.productsRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }

  async restore({ productId }) {
    const isRestored = await this.productsRepository.restore({ id: productId });
    return isRestored.affected ? true : false;
  }
}
