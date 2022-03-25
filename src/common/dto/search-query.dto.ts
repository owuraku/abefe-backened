import { IsString } from 'class-validator';

export class SearchQueryDto {
  @IsString()
  search: string;
}
