import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserOperationController } from './userOperation.controllers';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_OPERATION',
        transport: Transport.TCP,
      },
    ]),
  ],
  controllers: [UserOperationController],
})
export class UserOperationModule {}
