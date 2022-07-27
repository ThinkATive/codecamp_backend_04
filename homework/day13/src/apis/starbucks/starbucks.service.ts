import { Injectable } from '@nestjs/common';

@Injectable()
export class StarbucksService {
  createMenu({ starbucksMenuInput }) {
    console.log({ starbucksMenuInput: starbucksMenuInput });

    return '등록에 성공하였습니다.';
  }

  findAll() {
    const starbucksMenuData = [
      {
        menu: '아메리카노',
        price: 4500,
        kcal: 5,
        saturated_fat: 0,
        protein: 0,
        salt: 0,
        sugar: 0,
        caffeine: 75,
      },
      {
        menu: '카페라떼',
        price: 4500,
        kcal: 5,
        saturated_fat: 0,
        protein: 0,
        salt: 0,
        sugar: 0,
        caffeine: 75,
      },
      {
        menu: '돌체라떼',
        price: 4500,
        kcal: 5,
        saturated_fat: 0,
        protein: 0,
        salt: 0,
        sugar: 0,
        caffeine: 75,
      },
      {
        menu: '프라푸치노',
        price: 4500,
        kcal: 5,
        saturated_fat: 0,
        protein: 0,
        salt: 0,
        sugar: 0,
        caffeine: 75,
      },
      {
        menu: '티',
        price: 4500,
        kcal: 5,
        saturated_fat: 0,
        protein: 0,
        salt: 0,
        sugar: 0,
        caffeine: 75,
      },
    ];

    return starbucksMenuData;
  }
}
