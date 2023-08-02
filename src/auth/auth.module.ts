 import { Module } from '@nestjs/common'
 import { AuthCotroller } from './auth.controller'
 import { AuthService } from './auth.service'
//  import { PrismaModule } from 'src/prisma/prisma.module'

 @Module({
     imports: [],
     controllers: [AuthCotroller],
     providers: [AuthService]
 })
 export class AuthModule {}
