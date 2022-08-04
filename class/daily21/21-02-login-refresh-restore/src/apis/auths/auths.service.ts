import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthsService {
  constructor(
    private readonly jwtService: JwtService, //
  ) {}

  setRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id }, //
      { secret: 'myRefreshKey', expiresIn: '2w' },
    );

    // 개발환경
    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}`);

    // // 배포환경 //                   //적용될 범위 //내 백엔드서버 사이트,
    // res.setHeader(
    //   'Set-Cookie',
    //   `refreshToken=%${refreshToken}; path=/; domain=.mybacksite.com; SameSite=None; Secure; httpOnly;`,
    // );
    // // 프론트는 어떤 주소이어야하는가
    // res.setHeader('Access-Control-Allow-Origin', 'https://myfrontsite.com');
  }

  getAccessToken({ user }) {
    return this.jwtService.sign(
      { email: user.email, sub: user.id }, //
      { secret: 'myAccessKey', expiresIn: '10s' },
    );
  }
}
