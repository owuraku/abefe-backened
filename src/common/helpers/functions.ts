import { PAGE_SIZE } from '../config/app.settings';
import { PaginationQueryDto } from '../dto/pagination-query.dto';

export const getPaginationValues = (pagination: PaginationQueryDto) => {
  const { limit, offset } = pagination;
  return { offset: offset || 0, limit: limit || PAGE_SIZE };
};
