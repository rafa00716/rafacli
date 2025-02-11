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
import { {{classCaseSingular}}Service } from './{{kebabCaseSingular}}.service';
import { Create{{classCaseSingular}}Dto } from './dto/create-{{kebabCaseSingular}}.dto';
import { Update{{classCaseSingular}}Dto } from './dto/update-{{kebabCaseSingular}}.dto';
import { PaginatedRequestInterface } from './paginated.interface';

@Controller('{{kebabCasePlural}}')
export class {{classCaseSingular}}Controller {
  constructor(private readonly {{camelCaseSingular}}Service: {{classCaseSingular}}Service) {}

  @Post()
  create(@Body() create{{classCaseSingular}}Dto: Create{{classCaseSingular}}Dto) {
    return this.{{camelCaseSingular}}Service.create(create{{classCaseSingular}}Dto);
  }

  @Post('create-many')
  createMany(@Body() create{{classCaseSingular}}Dto: Create{{classCaseSingular}}Dto[]) {
    return this.{{camelCaseSingular}}Service.createMany(create{{classCaseSingular}}Dto);
  }

  @Get()
  findAll() {
    return this.{{camelCaseSingular}}Service.findAll();
  }

  @Get('paginated')
  findPaginated(@Query() query: PaginatedRequestInterface) {
    return this.{{camelCaseSingular}}Service.findPaginated(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.{{camelCaseSingular}}Service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() update{{classCaseSingular}}Dto: Update{{classCaseSingular}}Dto) {
    return this.{{camelCaseSingular}}Service.update(id, update{{classCaseSingular}}Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.{{camelCaseSingular}}Service.remove(id);
  }
}
