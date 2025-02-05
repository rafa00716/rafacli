import { Test, TestingModule } from '@nestjs/testing';
import { {{classCase}}Service } from './{{kebabCase}}.service';

describe('{{classCase}}Service', () => {
  let service: {{classCase}}Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{{classCase}}Service],
    }).compile();

    service = module.get<{{classCase}}Service>({{classCase}}Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
