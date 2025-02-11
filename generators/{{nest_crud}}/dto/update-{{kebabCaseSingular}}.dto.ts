import { PartialType } from '@nestjs/mapped-types';
import { Create{{classCaseSingular}}Dto } from './create-{{kebabCase}}.dto';

export class Update{{classCaseSingular}}Dto extends PartialType(Create{{classCaseSingular}}Dto) {}
