import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { LoginRequest } from './model/login-request';
import { RegistrationRequest } from './model/registration-request.model';
import { TokenRes } from './model/token-res';
import { UserRes } from './model/user-res';

@ApiTags('Authorization API')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 201, type: TokenRes })
  @Post('registration')
  create(@Body() userReq: RegistrationRequest) {
    return this.authService.createUser(userReq);
  }

  @ApiOperation({ summary: 'Return token' })
  @ApiResponse({ status: 201, type: TokenRes })
  @Post('/login')
  login(@Body() loginUser: LoginRequest) {
    return this.authService.loginUser(loginUser);
  }

  @ApiOperation({ summary: 'Check JWT Token' })
  @ApiResponse({ status: 201, type: UserRes })
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  checkToken(@Request() req) {
    return this.authService.getUser(req);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('users')
  // getUserg() {
  //   return this.authService.findAll();
  // }
}
