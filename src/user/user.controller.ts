 import { 
     Controller, 
     Get,
     Patch,
     UseGuards } from '@nestjs/common'
 import { User } from '@prisma/client'
 import { GetUser } from '../auth/decorator'

 import { JwtGuard } from 'src/auth/guard'


 @Controller('users')
 export class UserController {

     @UseGuards(JwtGuard)
     @Get('me')
     getMe(@GetUser() user: User, @GetUser('email') email: User) {
         console.log(({email}))
         return user
         
     }
     @Patch()
     editUser() {
        
     }
 }
