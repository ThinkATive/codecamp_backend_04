import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardsService } from './boards.service';
import { CreateBoardInput } from './dto/createBoard.input';
import { Board } from './entities/board.entity';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER, Inject } from '@nestjs/common';

@Resolver()
export class BoardsResolver {
  constructor(
    private readonly boardsService: BoardsService,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}
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
  async createBoard(
    // @Args('writer') writer: string,
    // @Args('title') title: string,
    // @Args('contents') contents: string,
    //@Args({name: 'createBoardInput', nullable: true })
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ) {
    // 1. 캐시에 등록하는 연습
    await this.cacheManager.set('aaa', createBoardInput, {
      ttl: 0, // 0으로 하면 -1로 들어감
    });

    // 2. 캐시에서 조회하는 연습
    const myCache = await this.cacheManager.get('aaa');
    console.log(myCache);

    return '지금은 캐시 테스트 중';
    ///////////////////////////////////////////////////////////
    // 레디스 연습을 위해서 잠시 주석 걸어놈
    // return this.boardsService.create({ createBoardInput });
  }
}
