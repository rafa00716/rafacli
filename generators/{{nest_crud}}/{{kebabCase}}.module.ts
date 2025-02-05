import { Module } from '@nestjs/common';
import { {{classCase}}Service } from './{{kebabCase}}.service';
import { {{classCase}}Controller } from './{{kebabCase}}.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { {{classCase}} } from './entities/{{kebabCase}}.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([{{classCase}}]),
  ],
  controllers: [{{classCase}}Controller],
  providers: [{{classCase}}Service],
})
export class {{classCase}}Module {}
