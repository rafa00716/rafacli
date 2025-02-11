import { Test, TestingModule } from '@nestjs/testing';
import { {{classCaseSingular}}Service } from './{{kebabCaseSingular}}.service';

describe('{{classCaseSingular}}Service', () => {
  let service: {{classCaseSingular}}Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{{classCaseSingular}}Service],
    }).compile();

    service = module.get<{{classCaseSingular}}Service>({{classCaseSingular}}Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
