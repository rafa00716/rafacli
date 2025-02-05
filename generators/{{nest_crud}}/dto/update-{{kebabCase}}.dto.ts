import { PartialType } from '@nestjs/mapped-types';
import { Create{{classCase}}Dto } from './create-{{kebabCase}}.dto';

export class Update{{classCase}}Dto extends PartialType(Create{{classCase}}Dto) {}
