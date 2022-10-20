import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('getAllUsers')
  getAllUsers() {
    return this.appService.getAllUsers();
  }
  @MessagePattern('getUser')
  getUser(data: any) {
    return this.appService.getUser(data);
  }
  @MessagePattern('createUser')
  createUser(data: any) {
    return this.appService.createUser(data);
  }
  @MessagePattern('updateUser')
  updateUser(data: any) {
    return this.appService.updateUser(data);
  }
  @MessagePattern('deleteUser')
  deleteUser(data: any) {
    return this.appService.deleteUser(data);
  }
}
