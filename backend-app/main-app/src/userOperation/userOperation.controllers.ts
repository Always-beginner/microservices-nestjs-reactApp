import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiBearerAuth('JWT-auth')
@ApiTags('UserCrud')
@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserOperationController {
  constructor(
    @Inject('USER_OPERATION') private readonly userOperation: ClientProxy,
  ) {}
  @Get('/getAllUsers')
  getAllUsers() {
    return this.userOperation.send('getAllUsers', {});
  }
  @Get('/:userId')
  @ApiParam({ name: 'userId', type: 'number' })
  getUser(@Param() params) {
    return this.userOperation.send('getUser', params.userId);
  }
  @Post('/createUser')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userOperation.send('createUser', createUserDto);
  }
  @Patch('/updateUser/:userId')
  @ApiParam({ name: 'userId', type: 'number' })
  updateUser(@Param() params, @Body() updateUserDto: UpdateUserDto) {
    return this.userOperation.send('updateUser', {
      userId: params.userId,
      data: updateUserDto,
    });
  }
  @Delete('/deleteUser/:userId')
  @ApiParam({ name: 'userId', type: 'number' })
  deleteUser(@Param() params) {
    return this.userOperation.send('deleteUser', params.userId);
  }
}
