import {
  IsString,
  IsNotEmpty,
} from 'class-validator';

export class Create{{classCase}}Dto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
