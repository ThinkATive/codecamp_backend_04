import { Module } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthsResolver } from './auths.resolver';
import { AuthsService } from './auths.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { JwtRefreshStrategy } from 'src/commons/auth/jwt-refresh.strategy';
import { JwtAccessStrategy } from 'src/commons/auth/jwt-access.strategy';
import { JwtGoogleStrategy } from 'src/commons/auth/jwt-social-google.strategy';
import { AuthsController } from './auths.controller';

@Module({
  imports: [
    JwtModule.register({}), //
    TypeOrmModule.forFeature([
      User, //
    ]),
  ],
  providers: [
    JwtAccessStrategy,
    JwtRefreshStrategy,
    JwtGoogleStrategy,
    AuthsResolver, //
    AuthsService,
    UsersService,
  ],
  controllers: [
    AuthsController, //
  ],
})
export class AuthsModule {}
