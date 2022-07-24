import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Cat } from './interfaces/cat.entity';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  constructor(
    @Inject('CAT_REPOSITORY')
    private catRepository: Repository<Cat>,
  ) {}

  create(createCatDto: CreateCatDto) {
    const cat = new Cat();
    cat.name = createCatDto.name;
    cat.age = createCatDto.age;
    cat.breed = createCatDto.breed;
    return this.catRepository.save(cat);
  }

  findAll() {
    return this.catRepository.find();
  }

  findOne(id: number) {
    return this.catRepository.findOneBy({ id });
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    const catToUpdate = await this.findOne(id);
    catToUpdate.name = updateCatDto.name;
    catToUpdate.age = updateCatDto.age;
    catToUpdate.breed = updateCatDto.breed;
    return this.catRepository.save(catToUpdate);
  }
  async remove(id: number) {
    await this.catRepository.delete(id);
  }
}
