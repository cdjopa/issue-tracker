import { Module, SetMetadata } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports: [ConfigModule.forRoot(), UsersModule, AuthModule],
  controllers: [AppController, AuthController],
  providers: [AppService, JwtService],
})
export class AppModule {}
