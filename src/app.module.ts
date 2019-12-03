import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [CatsModule, AuthModule],
  controllers: [AppController],
})
export class AppModule {}
