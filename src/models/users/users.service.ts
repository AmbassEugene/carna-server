import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from '../auth/dto/auth.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async register(createUserDto: { email: string; password: string }) {
    const user = await this.findByEmail(createUserDto.email);

    if (user) {
      throw new HttpException(
        'A user with this email id already exists. Please login instead',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const { email, password } = createUserDto;

    const newUser = await this.userRepository.create({ email, password });

    const res = await this.userRepository.save(newUser);

    return {
      message: 'Successful. User successfully created',
      email: res.email,
      created: res.created,
      status: HttpStatus.CREATED,
    };
  }

  async login(loginDto: { email: string }) {
    return this.findOne(loginDto);
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(payload: { email: string }) {
    const user = this.userRepository.findOne({
      where: { ...payload },
    });

    if (user) return user;

    return null;
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email: email },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
