import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { RefreshTokenRepository } from '../../repositories/services/refresh-token.repository';
import { UserRepository } from '../../repositories/services/user.repository';
import { UserMapper } from '../../users/services/user.mapper';
import { LoginReqDto } from '../models/dto/req/login.req.dto';
import { RegistrationReqDto } from '../models/dto/req/registration.req.dto';
import { AuthResDto } from '../models/dto/res/auth.res.dto';
import { TokenPairResDto } from '../models/dto/res/token-pair.res.dto';
import { IUserData } from '../models/interfaces/user-data.interface';
import { AuthCacheService } from './auth-cache-service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly authCacheService: AuthCacheService,
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  public async registration(dto: RegistrationReqDto): Promise<AuthResDto> {
    await this.isEmailNotExistOrThrow(dto.email);
    const password = await bcrypt.hash(dto.password, 10);
    const user = await this.userRepository.save(
      this.userRepository.create({ ...dto, password }),
    );
    const tokens = await this.tokenService.generateAuthTokens({
      userId: user.id,
      deviceId: dto.deviceId,
    });
    await Promise.all([
      this.authCacheService.saveToken(
        tokens.accessToken,
        user.id,
        dto.deviceId,
      ),
      this.refreshTokenRepository.save(
        this.refreshTokenRepository.create({
          user_id: user.id,
          deviceId: dto.deviceId,
          refreshToken: tokens.refreshToken,
        }),
      ),
    ]);

    return { user: UserMapper.toResDto(user), tokens };
  }

  public async login(dto: LoginReqDto): Promise<AuthResDto> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
      select: ['id', 'password'],
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const tokens = await this.tokenService.generateAuthTokens({
      userId: user.id,
      deviceId: dto.deviceId,
    });
    await Promise.all([
      this.authCacheService.saveToken(
        tokens.accessToken,
        user.id,
        dto.deviceId,
      ),
      this.refreshTokenRepository.save(
        this.refreshTokenRepository.create({
          user_id: user.id,
          deviceId: dto.deviceId,
          refreshToken: tokens.refreshToken,
        }),
      ),
    ]);
    const userEntity = await this.userRepository.findOneBy({ id: user.id });

    return { user: UserMapper.toResDto(userEntity), tokens };
  }

  public async logOut(userData: IUserData): Promise<void> {
    await Promise.all([
      this.authCacheService.deleteToken(userData.userId, userData.deviceId),
      this.refreshTokenRepository.delete({
        user_id: userData.userId,
        deviceId: userData.deviceId,
      }),
    ]);
  }

  public async refresh(userData: IUserData): Promise<TokenPairResDto> {
    await Promise.all([
      this.authCacheService.deleteToken(userData.userId, userData.deviceId),
      this.refreshTokenRepository.delete({
        user_id: userData.userId,
        deviceId: userData.deviceId,
      }),
    ]);

    const tokens = await this.tokenService.generateAuthTokens({
      userId: userData.userId,
      deviceId: userData.deviceId,
    });
    await Promise.all([
      this.authCacheService.saveToken(
        tokens.accessToken,
        userData.userId,
        userData.deviceId,
      ),
      this.refreshTokenRepository.save(
        this.refreshTokenRepository.create({
          user_id: userData.userId,
          deviceId: userData.deviceId,
          refreshToken: tokens.refreshToken,
        }),
      ),
    ]);

    return tokens;
  }

  private async isEmailNotExistOrThrow(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new Error('Email already exists');
    }
  }
}
