import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //                     (req) => {
      //     const accessToken = req.headers.Authorization; // "Bearer ...key값"
      //     const result = accessToken.replace('Bearer ', '');
      //     return result;
      //   },
      secretOrKey: 'myAccessKey',
    });
  }

  validate(payload) {
    console.log(payload); // {email: ..., sub : ...}
    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}
