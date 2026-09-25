import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Getuser } from './decorators/get-user.decorators';
import { User } from './entities/user.entity';
import { RawHeader } from './decorators/get-rawheader.decorator';
import { IncomingHttpHeaders } from 'http';
import { Headers } from './decorators/get-headers.decorator';
import { Roles } from './decorators/get-roles.decorator';
import { UserRoleGuard } from './guards/user-role.guard';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  create(@Body() createAuthDto: CreateUserDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @Getuser() user: User,
    @Getuser('email') email: User,
    @RawHeader() rawheader: string[],
    @Headers() headers: IncomingHttpHeaders,
  ) {

    return {
      ok: true,
      message: 'Hola Mundo Private',
      user: user,
      email: email,
      rawheader,
      headers
    }
  }

  @Get('private2')
  @Roles('admin')
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute2(@Getuser() user: User) {

    return {
      ok: true,
      user
    }
  }
}
