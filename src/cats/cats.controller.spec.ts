import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

const mockService = {
  findAll: async () => [
    {
      id: 1,
      name: 'Joe',
      age: 2,
      breed: 'Token',
    },
  ],
};

describe('Cats Controller', () => {
  let catsController: CatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        {
          provide: CatsService,
          useValue: mockService,
        },
      ],
    }).compile();

    catsController = module.get<CatsController>(CatsController);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      expect(await catsController.findAll()).toEqual(
        await mockService.findAll(),
      );
    });
  });
});
