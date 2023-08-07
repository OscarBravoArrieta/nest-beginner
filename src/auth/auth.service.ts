 import { ForbiddenException, Injectable } from "@nestjs/common"
 import { PrismaService } from "src/prisma/prisma.service"
 import { AuthDto } from "./dto"
 import * as argon from 'argon2'
 import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

 @Injectable({})
 export class AuthService {
     constructor (
         private prisma: PrismaService
     ) {

     }
     //--------------------------------------------------------------------------------------------
     login() {

     }
     //--------------------------------------------------------------------------------------------
     async signup(dto: AuthDto) {
         try {
             const hash = await argon.hash(dto.password) //Generat the password hash
             const user = await this.prisma.user.create({ //save the new user  in the db
                 data: {
                     email: dto.email,
                     hash,
                 },
                 select: {
                     id: true,
                     email: true,
                     createdAt: true,
                 }
             })
             return user //Return the saved user
            
         } catch (error) {
             if (error instanceof PrismaClientKnownRequestError) {  
                 if (error.code === 'P2002') {
                     throw new ForbiddenException(
                         'Credentials taken'
                     )
                 }
             }
             throw error
         }
     }
     //-------------------------------------------------------------------------------------------
     signin() {
         return { msg: 'I have signed in'}

     }
     //-------------------------------------------------------------------------------------------
 }

 