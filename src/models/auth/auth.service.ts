import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../users/entities/user.entity';

import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(data) {
    const user = await this.usersService.findOne(data.username);

    if (user && (await bcrypt.compare(data.password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(data: RegisterDto) {
    const passwordsMatch = data.password === data.confirmPassword;

    if (passwordsMatch) {
      return this.usersService.register(data);
    } else {
      throw new HttpException(
        'Password field does not match confirm password field',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async login(user: UserEntity) {
    return {
      token: this.jwtService.sign({ email: user.email, sub: user.id }),
      user,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: RegisterDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
