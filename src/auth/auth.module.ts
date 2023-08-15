 import { Module } from '@nestjs/common'
 import { JwtModule } from '@nestjs/jwt'
 import { AuthCotroller } from './auth.controller'
 import { AuthService } from './auth.service'
//  import { PrismaModule } from 'src/prisma/prisma.module'

 @Module({
     imports: [JwtModule.register({
        
     })],
     controllers: [AuthCotroller],
     providers: [AuthService]
 })
 export class AuthModule {}
