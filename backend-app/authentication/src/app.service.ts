import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { LoginAuthDto } from './dto/login.dto';
import { User } from './model/user.model';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private jwtService: JwtService,
  ) {}

  async findByEmail(email: string) {
    return await this.userModel.findOne({
      where: { email },
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.findByEmail(email);
    try {
      if (user && user.password === password) {
        const payload = { email: user.email, sub: user.id };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
    } catch (error) {
      return error;
    }
  }

  async login(user: LoginAuthDto) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
