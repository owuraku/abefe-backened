import { NotFoundException } from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { getPaginationValues } from './helpers/functions';
import { searchTerms } from './validators/exists-in-database.validator';
export class ResourcesService {
  constructor(protected readonly resourceRepository: Repository<any>) {}

  async findAll(
    pagination?: PaginationQueryDto | any,
    relations?: string[] | any[],
  ) {
    const { limit, offset } = getPaginationValues(pagination);
    return this.resourceRepository.find({
      skip: offset,
      take: limit,
      relations,
    });
  }

  async findOne(id: string, relations?: string[] | any[]) {
    const resource = await this.resourceRepository.findOne(
      {
        id,
      },
      { relations },
    );
    if (!resource) {
      throw new NotFoundException(`Resource with id ${id} not found`);
    }
    return resource;
  }

  async create(data: any) {
    try {
      const newResource = this.resourceRepository.create(data);
      return await this.resourceRepository.save(newResource);
    } catch (error) {
      console.log(error);

      return null;
    }
  }

  async update(id: string, data: any) {
    const existingResource = await this.resourceRepository.findOne(id);

    if (!existingResource) {
      throw new NotFoundException('Resource not found');
    }
    return this.resourceRepository.save({ ...existingResource, ...data });
  }

  async remove(id: string) {
    const resource = await this.findOne(id);
    return this.resourceRepository.remove(resource);
  }

  async search(queries: { [key: string]: string } | any) {
    const builder = this.resourceRepository.createQueryBuilder();
    // const fields = this.resourceRepository.

    for (const key in queries) {
      // differentiate between search values and search type
      const isSearchValue = !key.includes('_');
      const element = queries[key];
      if (isSearchValue) {
        const likeSearch =
          (queries[`${key}_search`] as searchTerms) == searchTerms.like;
        const searchTerm = likeSearch
          ? `${key} ilike :${key}`
          : `${key} =:${key}`;

        const searchValue = likeSearch ? `%${element.toLowerCase()}%` : element;
        builder.andWhere(searchTerm, { [key]: searchValue });
      }
    }
    return await builder.getMany();
  }
}
