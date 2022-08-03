import { UnprocessableEntityException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { AuthsService } from './auths.service';
import * as bcrypt from 'bcrypt';

@Resolver()
export class AuthsResolver {
  constructor(
    private readonly authsService: AuthsService, //
    private readonly usersService: UsersService,
  ) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string, //
    @Args('password') password: string,
  ) {
    const user = await this.usersService.findOneForLogin({ email });

    if (!user)
      throw new UnprocessableEntityException('가입된 이메일이 없습니다.');

    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');

    return this.authsService.getAccessToken({ user });
  }
}
