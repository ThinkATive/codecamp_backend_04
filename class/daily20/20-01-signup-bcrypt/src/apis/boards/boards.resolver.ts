import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardsService } from './boards.service';
import { CreateBoardInput } from './dto/createBoard.input';
import { Board } from './entities/board.entity';

@Resolver()
export class BoardsResolver {
  constructor(private readonly boardsService: BoardsService) {}
  //@Query(() => String, { nullable: true}) 필수가 아니게 됨
  // @Query(() => String)
  // getHello(): string {
  //   return this.boardsService.getHello();
  // }
  @Query(() => [Board])
  fetchBoards() {
    return this.boardsService.findAll();
  }

  @Mutation(() => String)
  createBoard(
    // @Args('writer') writer: string,
    // @Args('title') title: string,
    // @Args('contents') contents: string,
    //@Args({name: 'createBoardInput', nullable: true })
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ) {
    return this.boardsService.create({ createBoardInput });
  }
}
