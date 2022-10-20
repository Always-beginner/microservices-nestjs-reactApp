import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/user.model';
@Injectable()
export class AppService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async getAllUsers() {
    try {
      return await this.userModel.findAll();
    } catch (error) {
      throw error;
    }
  }

  async getUser(data: any) {
    try {
      let result = await this.userModel.findOne({
        where: { id: data },
      });
      if (!result) {
        return { error: 'User Not found' };
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async createUser(data: any) {
    try {
      console.log(data.name);
      console.log(data.email);
      console.log(data.password);
      let result = await this.userModel.create({ ...data });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(data: any) {
    try {
      let user = await this.userModel.update(
        { ...data?.data },
        {
          where: { id: data?.userId },
        },
      );
      if (user.includes(1)) {
        return {
          message: 'User Updated successfully',
          count: user.includes(1),
        };
      }
      return { message: 'User not found', count: user.includes(1) };
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(data: any) {
    try {
      let result = await this.userModel.destroy({ where: { id: data } });
      if (result > 0) {
        return { message: 'Deleted successfully', count: result };
      }
      return { message: 'Items Not found' };
    } catch (error) {
      throw error;
    }
  }
}
