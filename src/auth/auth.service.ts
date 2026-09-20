import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

import * as bcrypt from "bcrypt";
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,

    //This allow me to generate a Token
    private readonly jwtService: JwtService,
  ) { }

  async create(createUserDto: CreateUserDto) {

    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const user = this.UserRepository.create({
        ...createUserDto,
        password: hashedPassword
      });
      await this.UserRepository.save(user);
      delete user.password;

      return {
        ...user,
        token: this.getJwtToken({ id: user.id })
      };

    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.UserRepository.findOne({
      where: { email: email },
      select: { email: true, password: true, id: true }
    });

    if (!user) {
      throw new UnauthorizedException(`'Credentials are not valid :${email} '`);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException(`'Credentials are not valid : password '`);
    }

    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    };
  }


  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    console.log(error);
    throw new InternalServerErrorException('Please check server logs');
  }

}
