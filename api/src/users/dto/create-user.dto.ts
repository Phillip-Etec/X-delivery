import { ApiProperty, ApiBody } from '@nestjs/swagger'
import { IsEmail, IsDateString, IsString, IsIn, IsOptional, IsBoolean, Min, Max, Matches, IsNumberString, IsEnum } from 'class-validator'
import { Gender } from '@prisma/client'

// class Gender {
//
//    @IsString()
//    @IsIn(['Masculino', 'Feminino', 'Não binário', 'Prefiro não Informar'])
//    gender: string
//
// }

export class CreateUserDto {

   @IsString()
   name: string

   @IsEmail()
   email: string

   @Min(8)
   @IsString()
   password: string

   @Min(11)
   @Max(11)
   @IsNumberString()
   @IsString()
   ssn: string

   @IsDateString()
   birthday: string

   @IsEnum(Gender)
   @IsIn(['Masculino', 'Feminino', 'Não binário', 'Prefiro não Informar'])
   gender: Gender

   @IsBoolean()
   isAdmin: boolean

   @IsBoolean()
   isActive: boolean

}
