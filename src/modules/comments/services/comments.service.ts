import { Injectable } from '@nestjs/common';

import { ArticleID } from '../../../common/types/entity-ids.type';
import { CreateCommentDto } from '../models/dto/req/create-comment.dto';

@Injectable()
export class CommentsService {
  create(createCommentDto: CreateCommentDto) {
    return 'This action adds a new comment';
  }

  findAll() {
    return `This action returns all comments`;
  }

  public async deleteAllCommentsForArticle(articleId: string) {
    // Delete all comments for the article
  }
}
