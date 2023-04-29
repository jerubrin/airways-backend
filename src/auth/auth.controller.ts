import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { RegistrationRequest } from './model/registration-request.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { LoginRequest } from './model/login-request';
import { TokenRes } from './model/token-res';

@ApiTags('Authorization API')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 201, type: User })
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

  // @UseGuards(JwtAuthGuard)
  // @Get('users')
  // getUserg() {
  //   return this.authService.findAll();
  // }
}
