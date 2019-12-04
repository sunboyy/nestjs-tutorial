import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './cat';
import { Repository } from 'typeorm';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat) private readonly catRepository: Repository<Cat>,
  ) {}

  async create(catData: CreateCatDto): Promise<Cat> {
    const cat = new Cat();
    cat.name = catData.name;
    cat.age = catData.age;
    cat.breed = catData.breed;

    return this.catRepository.save(cat);
  }

  async findAll(): Promise<Cat[]> {
    return this.catRepository.find();
  }

  async findOne(id: number): Promise<Cat | undefined> {
    return this.catRepository.findOne(id);
  }
}
