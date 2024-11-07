import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { LoginReqDto } from './models/dto/req/login.req.dto';
import { RegistrationReqDto } from './models/dto/req/registration.req.dto';
import { AuthResDto } from './models/dto/res/auth.res.dto';
import { AuthService } from './services/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async registration(
    @Body() dto: RegistrationReqDto,
  ): Promise<AuthResDto> {
    return await this.authService.registration(dto);
  }

  @Post('login')
  public async login(@Body() dto: LoginReqDto): Promise<AuthResDto> {
    return await this.authService.login(dto);
  }
}
