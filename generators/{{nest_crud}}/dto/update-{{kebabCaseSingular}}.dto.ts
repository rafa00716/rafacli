import { PartialType } from '@nestjs/mapped-types';
import { Create{{classCaseSingular}}Dto } from './create-{{kebabCaseSingular}}.dto';

export class Update{{classCaseSingular}}Dto extends PartialType(Create{{classCaseSingular}}Dto) {}
