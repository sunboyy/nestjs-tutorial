import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsModule } from './cats/cats.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { Cat } from './cats/cat';

@Module({
  imports: [
    CatsModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data.db',
      entities: [Cat],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
