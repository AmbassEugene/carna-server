import { Injectable } from '@nestjs/common';

import { RegisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  register(createAuthDto) {
    return 'This action adds a new auth';
  }

  login() {
    return `This action returns all auth`;
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
