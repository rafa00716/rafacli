import { Injectable } from '@nestjs/common';
import { Create{{classCase}}Dto } from './dto/create-{{kebabCase}}.dto';
import { Update{{classCase}}Dto } from './dto/update-{{kebabCase}}.dto';
import { ErrorHandler } from '../../utils/error.handler';
import { FindOptionsWhere, Repository, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { {{classCase}} } from './entities/{{kebabCase}}.entity';
import {
  PaginatedRequestInterface,
  PaginatedResponse,
} from '../../models/paginated.interface';

type CreateDtoClass = Create{{classCase}}Dto;
type UpdateDtoClass = Update{{classCase}}Dto;
@Injectable()
export class {{classCase}}Service {
  private subjectName = '{{classCase}}';
  constructor(
    @InjectRepository({{classCase}})
    private repository: Repository<{{classCase}}>,
  ) {}
  async create(createDtoObject: CreateDtoClass) {
    if (createDtoObject.name) {
      const rowFound = await this.repository.findOne({
        where: { name: createDtoObject.name },
      });

      if (rowFound) {
        ErrorHandler.duplicatedEntry(
          this.subjectName + ' ' + createDtoObject.name,
        );
      }
    }

    const rowCreated: Client = this.repository.create(createDtoObject);

    return this.repository.save(rowCreated);

  }

  async createMany(
    createDtoObjects: CreateDtoClass[]
  ) {
    const created: {{classCase}}[] = [];
    const nonCreated: { row: CreateDtoClass; error: any }[] = [];

    for (const dtoObject of createDtoObjects) {
      try {
        const rowCreated = await this.create(dtoObject, createUispToo);
        created.push(rowCreated);
      } catch (error) {
        console.log(error);
        nonCreated.push({
          row: dtoObject,
          error,
        });
      }
    }

    return { created, nonCreated };
  }

  findAll() {
    return this.repository.find();
  }

  async findPaginated(query: PaginatedRequestInterface) {
    const { take, skip, orderBy, orderDirection, ...filter } = query;

    const entries = Object.entries(filter);
    const newEntries = [];
    entries.forEach(([key, value]) => {
      const wordSeparated = String(value).trim().split(' ');
      if (wordSeparated.length > 1) {
        wordSeparated.forEach((word) => newEntries.push([key, word]));
      }
      newEntries.push([key, value]);
    });

    const where: FindOptionsWhere<{{classCase}}>[] = newEntries.map(([key, value]) => {
        return { [key]: ILike(`%${String(value).trim()}%`) };
    });

    const [dataSource, length] = await this.repository.findAndCount({
      take: take ?? 10,
      skip: skip ?? 0,
      order: {
        [orderBy]: orderDirection,
      },
      where,
    });

    const pageSize = take;
    const pageIndex = Math.floor(skip / pageSize);

    const paginatedResponse: PaginatedResponse<{{classCase}}> = {
      dataSource,
      length,
      pageSize,
      pageIndex,
    };

    return paginatedResponse;
  }

  findOne(id: string) {
    return this.repository.findOne({
      where: { id },
    });
  }

  async update(id: string, updateDtoObject: UpdateDtoClass) {
    const rowFound = await this.repository.findOne({
      where: { id },
    });

    if (!rowFound) {
      ErrorHandler.notFoundEntry(this.subjectName);
    }

    const rowMerged = this.repository.merge(rowFound, updateDtoObject);
    const rowSaved = await this.repository.save(rowMerged);
    return rowSaved;
  }

  async remove(id: string) {
    const rowFound = await this.repository.findOne({
      where: { id },
    });

    if (!rowFound) {
      ErrorHandler.notFoundEntry(this.subjectName);
    }
    
    return this.repository.remove(rowFound);
  }
}
