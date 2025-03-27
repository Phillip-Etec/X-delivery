import { IsEmail, IsDate, IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator'

export class CreateUserDto {

   @IsString()
   name: string

   @IsEmail()
   email: string

   @IsString()
   password: string

   @IsString()
   ssn: string

   @IsDate()
   birthday: string

   @IsString()
   gender: string

   @IsBoolean()
   isAdmin: boolean

   @IsBoolean()
   isActive: boolean

}
