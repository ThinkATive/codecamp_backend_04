import { Injectable, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthsService {
  constructor(
    private readonly jwtService: JwtService, //
    private readonly usersService: UsersService,
  ) {}

  setRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id }, //
      { secret: 'myRefreshKey', expiresIn: '2w' },
    );

    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`);
  }

  getAccessToken({ user }) {
    return this.jwtService.sign(
      { email: user.email, sub: user.id }, //
      { secret: 'myAccessKey', expiresIn: '12h' },
    );
  }

  async loginSocial({ req, res }) {
    let user = await this.usersService.findOneForLogin({
      email: req.user.email,
    });

    if (!user) user = await this.usersService.create({ ...req.user });

    this.setRefreshToken({ user, res });

    // 로그인하면 메뉴 페이지로 전환
    res.redirect(
      'http://localhost:5500/main-project/frontend/frontend/menu/index.html',
    );
  }
}
