import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { RawHeaders } from './decorators/raw-headers.decorator';
import { UserRoleGuard } from './guards/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ValidRoles } from './interfaces/valid-roles.interface';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  create(@Body() createAuthDto: CreateUserDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testPrivateRoute(
    @GetUser() user,
    @GetUser('email') email,
    @RawHeaders() rawHeaders,
  ) {
    return {
      ok: true,
      message: 'Private route',
      user,
      email,
      rawHeaders: rawHeaders,
    };
  }

  @Get('admin')
  // @SetMetadata('roles', ['admin'])
  @RoleProtected(ValidRoles.admin)
  @UseGuards(AuthGuard(), UserRoleGuard)
  testAdminRoute(@GetUser() user) {
    return {
      ok: true,
      message: 'Private route',
      user,
    };
  }

  @Get('super')
  @Auth(ValidRoles.super)
  testSuperRoute(@GetUser() user) {
    return {
      ok: true,
      message: 'Private route',
      user,
    };
  }
}
