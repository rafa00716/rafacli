import { IsString, IsNotEmpty } from 'class-validator';

export class Create{{classCaseSingular}}Dto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
