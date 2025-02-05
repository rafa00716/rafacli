import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { {{classCase}}Service } from './{{kebabCase}}.service';
import { Create{{classCase}}Dto } from './dto/create-{{kebabCase}}.dto';
import { Update{{classCase}}Dto } from './dto/update-{{kebabCase}}.dto';
import { PaginatedRequestInterface } from '../../models/paginated.interface';

@Controller('{{kebabCase}}')
export class {{classCase}}Controller {
  constructor(
    private readonly {{camelCase}}Service: {{classCase}}Service,
  ) {}

  @Post()
  create(@Body() create{{classCase}}Dto: Create{{classCase}}Dto) {
    return this.{{camelCase}}Service.create(create{{classCase}}Dto);
  }

  @Post('create-many')
  createMany(@Body() create{{classCase}}Dto: Create{{classCase}}Dto[]) {
    return this.{{camelCase}}Service.createMany(create{{classCase}}Dto);
  }

  @Get()
  findAll() {
    return this.{{camelCase}}Service.findAll();
  }

  @Get('paginated')
  findPaginated(@Query() query: PaginatedRequestInterface) {
    return this.{{camelCase}}Service.findPaginated(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.{{camelCase}}Service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() update{{classCase}}Dto: Update{{classCase}}Dto) {
    return this.{{camelCase}}Service.update(id, update{{classCase}}Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.{{camelCase}}Service.remove(id);
  }
}
