// import { Controller, Get } from '@nestjs/common';
import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { AppService } from './app.service';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  @Query(() => String)
  aaa() {
    return 'aaaa';
  }

  @Mutation(() => String)
  login() {
    return '로그인 성공!';
  }
}
