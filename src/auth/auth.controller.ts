 import { Body, Controller, Post } from "@nestjs/common"
 import { AuthService } from "./auth.service"
 import { AuthDto } from "./dto"

 @Controller('auth')
 export class AuthCotroller {

     constructor(
         private authService: AuthService
         ) {
     }
     //--------------------------------------------------------------------------------------------
     @Post('signup')
     signup(@Body() mdto: AuthDto){
         
         return this.authService.signup()
     }
     //--------------------------------------------------------------------------------------------
     @Post('signin')
     signin(){
         return this.authService.signin()
     }
     //--------------------------------------------------------------------------------------------
 }