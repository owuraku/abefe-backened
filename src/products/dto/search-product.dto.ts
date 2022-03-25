import { ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { _IsSearchTerm } from 'src/common/validators/search-term.validator';
import { CreateProductDto } from './create-product.dto';

export class SearchProductDto extends PickType(CreateProductDto, [
  'name',
] as const) {
  @IsOptional()
  @_IsSearchTerm()
  @ApiPropertyOptional({
    description: 'The type of search this is ',
    example: 'like | exact',
  })
  readonly name_search: string;
}
