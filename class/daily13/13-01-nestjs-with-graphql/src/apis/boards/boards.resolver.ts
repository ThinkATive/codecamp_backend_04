import { Query, Resolver } from '@nestjs/graphql';
import { BoardsService } from './boards.service';

@Resolver()
export class BoardsResolver {
  constructor(private readonly boardsService: BoardsService) {}
  //@Query(() => String, { nullable: true}) 필수가 아니게 됨
  @Query(() => String)
  getHello(): string {
    return this.boardsService.getHello();
  }
}
