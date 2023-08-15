 import { ForbiddenException, Injectable } from "@nestjs/common"
 import { PrismaService } from "src/prisma/prisma.service"
 import { AuthDto } from "./dto"
 import * as argon from 'argon2'
 import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
 import { JwtService } from "@nestjs/jwt"
 import { ConfigService } from "@nestjs/config"

 @Injectable({})
 export class AuthService {
     constructor (
         private prisma: PrismaService,
         private jwt: JwtService,
         private config: ConfigService
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
                //  select: {
                //      id: true,
                //      email: true,
                //      createdAt: true,
                //  }
             })
             //return user //Return the saved user
             return this.signToken(user.id, user.email)
         } catch (error) {
             if (error instanceof PrismaClientKnownRequestError) {  
                 if (error.code === 'P2002') {
                     throw new ForbiddenException(
                         'Credentials have been taken'
                     )
                 }
             }
             throw error
         }
     }
     //-------------------------------------------------------------------------------------------
     async signin(dto: AuthDto) {
        
         const user = await this.prisma.user.findUnique({ // find the user by email
             where: {
                 email: dto.email,
             }
         })
         
         if (!user) { // is user does not exist throw exception
             throw new ForbiddenException(
                 'Credentials incorrect'
             )
         }

         const pwMatches = await argon.verify( //Compare password
             user.hash,
             dto.password
         )

         if (!pwMatches) { // if password is incorrect throw exception
             throw new ForbiddenException(
                 'Credentials incorrect'
             )
         }

         //delete user.hash
         //return user
         return this.signToken(user.id, user.email)

     }
     //-------------------------------------------------------------------------------------------
     async signToken (userId: number, email: string): Promise<{access_token: string}> {

         const payload = {
             sub: userId,
             email
         }

         const secret = await this.config.get('JWT_SECRET')

         const token = await this.jwt.signAsync(
             payload, 
             {
                 expiresIn: '15m',
                 secret: secret
             }
         )

         return {
             access_token: token,
         }
     }
 }

 