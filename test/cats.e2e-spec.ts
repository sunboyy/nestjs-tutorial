import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { CatsModule } from '../src/cats/cats.module';
import { CatsService } from '../src/cats/cats.service';

describe('Cats', () => {
  let app: INestApplication;
  const catsService = {
    findAll: () => [
      {
        name: 'Joe',
        age: 2,
        breed: 'Token',
      },
    ],
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [CatsModule],
    })
      .overrideProvider(CatsService)
      .useValue(catsService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('GET /cats', () => {
    return request(app.getHttpServer())
      .get('/cats')
      .expect(200)
      .expect(catsService.findAll());
  });

  afterAll(async () => {
    await app.close();
  });
});
