import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { PaymentInfo } from './entities/paymentInfo.entity';

@Injectable()
export class PaymentsInfosService {
  constructor(
    @InjectRepository(PaymentInfo)
    private readonly paymentsInfosRepository: Repository<PaymentInfo>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly connection: Connection,
  ) {}

  async findAll() {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');
    try {
      const paymentInfo = await queryRunner.manager.find(PaymentInfo, {
        lock: { mode: 'pessimistic_write' },
      });

      // // 처리에 5초간의 시간이 걸림을 가정!! ( finally release() 없애야함 )
      // setTimeout(async () => {
      //   await queryRunner.commitTransaction();
      // }, 5000);

      await queryRunner.commitTransaction();

      return paymentInfo;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async create({ impUid, amount, status, user: _user }) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction('SERIALIZABLE');

    try {
      const PaymentInfo = this.paymentsInfosRepository.create({
        impUid,
        amount,
        status,
      });

      // await this.paymentsInfosRepository.save(PaymentInfo);
      await queryRunner.manager.save(PaymentInfo);

      // 2. 유저의 돈 찾아오기
      // const user = await this.usersRepository.findOne({ where: { id: _user.id } });
      const user = await queryRunner.manager.findOne(User, {
        where: { id: _user.id },
        lock: { mode: 'pessimistic_write' },
      });

      // 3. 유저의 돈 업데이트
      // await this.usersRepository.update(
      //   { id: _user.id },
      //   { point: user.point + Math.floor(amount / 100) },
      // );
      const updateUser = this.usersRepository.create({
        ...user,
        point: user.point + Math.floor(amount / 100),
      });
      await queryRunner.manager.save(updateUser);

      // // 처리에 5초간의 시간이 걸림을 가정!! ( finally release() 없애야함 )
      // setTimeout(async () => {
      //   await queryRunner.commitTransaction();
      // }, 5000);

      await queryRunner.commitTransaction();

      return PaymentInfo;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async checkRepo({ imp_Uid }) {
    return await this.paymentsInfosRepository.findOne({
      where: { impUid: imp_Uid },
    });
  }
}
