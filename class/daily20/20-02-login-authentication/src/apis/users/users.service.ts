import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>, //
  ) {}

  findOne({ email }) {
    return this.usersRepository.findOne({ where: { email } });
  }

  /////////////////////hashedPassword를 password 변수명으로 받기.
  async create({ email, hashedPassword: password, name, age }) {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (user) throw new ConflictException('이미 등록된 이메일입니다.');
    //throw new HttpException('이미 등록된 이메일입니다.', HttpStatus.CONFLICT); //이것도 가능

    return this.usersRepository.save({ email, password, name, age });
  }
}
