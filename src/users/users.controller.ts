import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { NoFilesInterceptor } from '@nestjs/platform-express';

@ApiTags("user")
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("register")
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema:{
      type : "object",
      properties : {
        nom : {type : "string"},
        prenom : {type : "string"},
        email : {type : "string"},
        role : {type : "string"},
        password : {type : "string"},
        passwordConfirm : {type : "string"}
      }
    }
  })
  @UseInterceptors(NoFilesInterceptor())
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @Post("login")
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema : {
      type : "object",
      properties : {
        email : {type : "string"},
        password : {type : "string"},
      }
    }
  })
  @UseInterceptors(NoFilesInterceptor())
  login(@Body() createUserDto: CreateUserDto) {
    return this.usersService.login(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
