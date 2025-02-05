import { Test, TestingModule } from '@nestjs/testing';
import { {{classCase}}Controller } from './{{kebabCase}}.controller';
import { {{classCase}}Service } from './{{kebabCase}}.service';

describe('{{classCase}}Controller', () => {
  let controller: {{classCase}}Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [{{classCase}}Controller],
      providers: [{{classCase}}Service],
    }).compile();

    controller = module.get<{{classCase}}Controller>({{classCase}}Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
