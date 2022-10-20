import { UserOperationModule } from './userOperation/userOperation.module';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/auth.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_OPERATION',
        transport: Transport.TCP,
      },
      {
        name: 'AUTHENTICATION',
        transport: Transport.TCP,
        options: { port: 3001 },
      },
    ]),
    UserOperationModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
