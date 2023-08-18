 import { Module } from '@nestjs/common'
 import { JwtModule } from '@nestjs/jwt'
 import { AuthCotroller } from './auth.controller'
 import { AuthService } from './auth.service'
 import { JwtStrategy } from './strategy'
//  import { PrismaModule } from 'src/prisma/prisma.module'

 @Module({
     imports: [JwtModule.register({
        
     })],
     controllers: [AuthCotroller],
     providers: [AuthService, JwtStrategy],
    
 })
 export class AuthModule {}
