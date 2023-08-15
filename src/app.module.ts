import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { BookmarkModule } from './bookmark/bookmark.module'
import { UserModule } from './user/user.module'
import { PrismaModule } from './prisma/prisma.module'

@Module({
  imports: [
     AuthModule, 
     ConfigModule.forRoot({
         isGlobal: true
     }),
     BookmarkModule, 
     UserModule, 
     PrismaModule
 ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}