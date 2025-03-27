import { Controller, Get, Post, Put, Body, Patch, Param, ParseIntPipe, Delete, Options, Head } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
   constructor(private readonly usersService: UsersService) { }

   @Get()
   async findAll() {
      return await this.usersService.findAll();
   }

   @Get(':id')
   async findOne(@Param('id', ParseIntPipe) id: number) {
      return await this.usersService.findOne(id);
   }

   @Post()
   create(@Body() createUserDto: CreateUserDto) {
      return this.usersService.create(createUserDto);
   }

   @Put(':id')
   async edit(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
      return await this.usersService.update(id, updateUserDto);
   }

   @Delete(':id')
   remove(@Param('id', ParseIntPipe) id: number) {
      return this.usersService.remove(id);
   }

   @Patch(':id')
   async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
      return await this.usersService.update(id, updateUserDto);
   }

   @Options()
   options() {
      return `Yo it works`
   }

   @Head()
   header() {
      return `What color is it?`
   }
}
