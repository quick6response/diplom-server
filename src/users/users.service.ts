import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User, UserCreate } from './interface/user';
import { UsersModel } from './models/users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UsersModel) private readonly userModel: typeof UsersModel,
  ) {
    // this.create({
    //   role: UserRole.MANAGER_PERSONAL,
    //   middleName: 'Романович',
    //   login: 'admin',
    //   password: 'admin',
    //   firstName: 'Админ',
    //   lastName: 'Админов',
    // });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async create(user: UserCreate): Promise<User> {
    return this.userModel.create(user);
  }

  async findOne(id: number): Promise<User> {
    return this.userModel.findOne({ where: { id } });
  }
}
