import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!!!!   ANI' + process.env.DATABASE_URL;
  }
}
