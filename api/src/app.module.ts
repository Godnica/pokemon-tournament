import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from './coremodule/core.module';


//Per il container

// {
//   type: 'postgres',
//   url: process.env.DATABASE_URL,
//   autoLoadEntities: true,
//   synchronize: true
// }

// {
//   type: 'postgres',
//   host: process.env.DATABASE_HOST,
//   port: +process.env.DATABASE_PORT,
//   username: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME,
//   autoLoadEntities: true,
//   synchronize: true,
// }

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot(
      {
        type: 'postgres',
        url: process.env.DATABASE_URL,
        autoLoadEntities: true,
        synchronize: true
      }
    ),
    CoreModule
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
