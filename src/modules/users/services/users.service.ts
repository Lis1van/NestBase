import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UserID } from '../../../common/types/entity-ids.type';
import { ConfigType } from '../../../configs/config.type';
import { UserEntity } from '../../../database/entities/user.entity';
import { IUserData } from '../../auth/models/interfaces/user-data.interface';
import { ArticleRepository } from '../../repositories/services/article.repository';
import { UserRepository } from '../../repositories/services/user.repository';
import { UpdateUserReqDto } from '../models/dto/req/update-user.req.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService<ConfigType>,
    private userRepository: UserRepository,
    private articleRepository: ArticleRepository,
  ) {}

  public async findMe(userData: IUserData) {
    return `This action returns a #${userData.userId} user`;
  }

  public async updateMe(userData: IUserData, dto: UpdateUserReqDto) {
    return `This action updates a #${userData.userId} user`;
  }

  public async removeMe(userData: IUserData) {
    return `This action removes a #${userData.userId} user`;
  }

  public async findOne(userId: UserID): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ id: userId });
  }
}
