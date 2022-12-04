import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  DeleteResult,
  EntityNotFoundError,
  Repository,
  UpdateResult,
} from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);

  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<Array<User>> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneOrFail({ where: { id } });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    await this.userRepository.findOneOrFail({ where: { id } });
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.userRepository.findOneOrFail({ where: { id } });
    return await this.userRepository.delete(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      return await this.userRepository.findOneOrFail({ where: { email } });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        return null;
      }

      this.logger.error(error);
      throw new BadRequestException('Something as wrong', {
        description: 'USER_UNKNOWN_ERROR',
      });
    }
  }
}
