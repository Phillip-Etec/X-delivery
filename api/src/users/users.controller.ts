import { Controller, Get, Post, Put, Body, Patch, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
   constructor(private readonly usersService: UsersService) { }

   @Post()
   create(@Body() createUserDto: CreateUserDto) {
      return this.usersService.create(createUserDto);
   }

   @Get()
   async findAll() {
      return await this.usersService.findAll();
   }

   @Get(':id')
   async findOne(@Param('id', ParseIntPipe) id: number) {
      return await this.usersService.findOne(id);
   }

   @Put(':id')
   async edit(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
      return await this.usersService.update(id, updateUserDto);
   }

   @Patch(':id')
   async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
      return await this.usersService.update(id, updateUserDto);
   }


   @Delete(':id')
   remove(@Param('id', ParseIntPipe) id: number) {
      return this.usersService.remove(id);
   }
}
