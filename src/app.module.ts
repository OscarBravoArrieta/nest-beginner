import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, BookmarkModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


// https://www.youtube.com/watch?v=GHTA143_b-s
// NestJs Course for Beginners - Create a REST API