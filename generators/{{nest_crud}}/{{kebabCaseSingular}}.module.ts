import { Module } from '@nestjs/common';
import { {{classCaseSingular}}Service } from './{{kebabCaseSingular}}.service';
import { {{classCaseSingular}}Controller } from './{{kebabCaseSingular}}.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { {{classCaseSingular}} } from './entities/{{kebabCaseSingular}}.entity';
@Module({
  imports: [TypeOrmModule.forFeature([{{classCaseSingular}}])],
  controllers: [{{classCaseSingular}}Controller],
  providers: [{{classCaseSingular}}Service],
})
export class {{classCaseSingular}}Module {}
