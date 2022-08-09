import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpdateUserInput } from './dto/updateUser.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService, //
  ) {}

  @Query(() => [User])
  fetchUsers() {
    return this.usersService.findAll();
  }

  @Query(() => User)
  fetchUser(
    @Args('userId') userId: string, //
  ) {
    return this.usersService.findOne({ userId });
  }

  @Query(() => [User])
  fetchUsersWithDeleted() {
    return this.usersService.findAllWithDeleted();
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => User)
  fetchLoginUser(
    @Context() context: any, //
  ) {
    const userId = context.req.user.id;
    return this.usersService.findOne({ userId });
  }

  @Mutation(() => User)
  async createUser(
    @Args('name') name: string,
    @Args('phonenumber') phonenumber: string,
    @Args('email') email: string,
    @Args('address') address: string,
    @Args('gender') gender: string,
    @Args('password') password: string,
    @Args('residentregistrationnumber') residentregistrationnumber: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 8);
    return this.usersService.create({
      name,
      phonenumber,
      email,
      address,
      gender,
      hashedPassword,
      residentregistrationnumber,
    });
  }

  @Mutation(() => User)
  async updateUser(
    @Args('userId') userId: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    await this.usersService.checkUser({ userId });

    return this.usersService.update({ userId, updateUserInput });
  }

  @Mutation(() => Boolean)
  deleteUser(
    @Args('userId') userId: string, //
  ) {
    return this.usersService.delete({ userId });
  }

  @Mutation(() => Boolean)
  restoreUser(
    @Args('userId') userId: string, //
  ) {
    return this.usersService.restore({ userId });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  async updateUserPwd(
    @Args('newPassword') newPassword: string,
    @Context() context: any,
  ) {
    const newHashedPassword = await bcrypt.hash(newPassword, 8);
    const userId = context.req.user.id;
    return this.usersService.updatePWD({ userId, newHashedPassword });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  deleteLoginUser(
    @Args('wantToDelete') wantToDelete: boolean,
    @Context() context: any,
  ) {
    if (wantToDelete) {
      const userId = context.req.user.id;
      return this.usersService.delete({ userId });
    } else return false;
  }
}
