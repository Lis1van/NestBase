import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from './decorators/current-user.decorator';
import { SkipAuth } from './decorators/skip-auth.decorator';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { LoginReqDto } from './models/dto/req/login.req.dto';
import { RegistrationReqDto } from './models/dto/req/registration.req.dto';
import { AuthResDto } from './models/dto/res/auth.res.dto';
import { TokenPairResDto } from './models/dto/res/token-pair.res.dto';
import { IUserData } from './models/interfaces/user-data.interface';
import { AuthService } from './services/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @Post('register')
  public async registration(
    @Body() dto: RegistrationReqDto,
  ): Promise<AuthResDto> {
    return await this.authService.registration(dto);
  }

  @SkipAuth()
  @Post('login')
  public async login(@Body() dto: LoginReqDto): Promise<AuthResDto> {
    return await this.authService.login(dto);
  }

  @ApiBearerAuth()
  @Post('log-out')
  public async logOut(@CurrentUser() userData: IUserData): Promise<void> {
    return await this.authService.logOut(userData);
  }

  @SkipAuth()
  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  public async refresh(
    @CurrentUser() userData: IUserData,
  ): Promise<TokenPairResDto> {
    return await this.authService.refresh(userData);
  }
}
