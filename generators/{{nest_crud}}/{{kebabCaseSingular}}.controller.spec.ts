import { Test, TestingModule } from '@nestjs/testing';
import { {{classCaseSingular}}Controller } from './{{kebabCaseSingular}}.controller';
import { {{classCaseSingular}}Service } from './{{kebabCaseSingular}}.service';

describe('{{classCaseSingular}}Controller', () => {
  let controller: {{classCaseSingular}}Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [{{classCaseSingular}}Controller],
      providers: [{{classCaseSingular}}Service],
    }).compile();

    controller = module.get<{{classCaseSingular}}Controller>({{classCaseSingular}}Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
