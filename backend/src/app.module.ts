import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ProjectsModule } from './projects/projects.module';
import { IssuesModule } from './issues/issues.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, AuthModule, ProjectsModule, IssuesModule],
  controllers: [AppController, AuthController],
  providers: [AppService, JwtService],
})
export class AppModule {}
