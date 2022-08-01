import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpdateUserInput } from './dto/updateUser.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

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

  @Mutation(() => User)
  createUser(
    @Args('name') name: string,
    @Args('phonenumber') phonenumber: string,
    @Args('email') email: string,
    @Args('address') address: string,
    @Args('gender') gender: string,
    @Args('password') password: string,
    @Args('residentregistrationnumber') residentregistrationnumber: string,
  ) {
    return this.usersService.create({
      name,
      phonenumber,
      email,
      address,
      gender,
      password,
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
}
