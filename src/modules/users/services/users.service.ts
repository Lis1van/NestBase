import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppConfig, ConfigType } from '../../../configs/config.type';
import { UserRepository } from '../../repositories/services/user.repository';
import { CreateUserReqDto } from '../models/dto/req/create-user.req.dto';
import { UpdateUserReqDto } from '../models/dto/req/update-user.req.dto';
import { UserResDto } from '../models/dto/res/user.res.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService<ConfigType>,
    private userRepository: UserRepository,
  ) {}
  public async create(createUserDto: CreateUserReqDto): Promise<UserResDto> {
    const appConfig = this.configService.get<AppConfig>('postgres');
    throw new ForbiddenException('sdfg');

    return {} as UserResDto;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserReqDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  public async checkAbilityToEditArticle(userId: string, articleId: string) {
    // Check if the user has permission to edit the article
  }
}
