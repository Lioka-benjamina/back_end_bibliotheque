import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { MembresService } from './membres.service';
import { CreateMembreDto } from './dto/create-membre.dto';
import { UpdateMembreDto } from './dto/update-membre.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { NoFilesInterceptor } from '@nestjs/platform-express';

@ApiTags('membres')
@Controller('membres')
export class MembresController {
  constructor(private readonly membresService: MembresService) {}

  @Post()
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema :{
      type : "object",
      properties : {
        nom : {type : "string"},
        prenom : {type : "string"},
        numero_mobile : {type : "number"},
        email : {type : "string"},
        genre : {type : "string"},
        image : {type : "file"},
      }
    }
  })
  @UseInterceptors(NoFilesInterceptor())
  create(@Body() createMembreDto: CreateMembreDto) {
    return this.membresService.create(createMembreDto);
  }

  @Get()
  findAll() {
    return this.membresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.membresService.findOne(+id);
  }

  @Patch(':id')
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema :{
      type : "object",
      properties : {
        nom : {type : "string"},
        prenom : {type : "string"},
        numero_mobile : {type : "number"},
        email : {type : "string"},
        genre : {type : "string"},
        image : {type : "string"},
      }
    }
  })
  @UseInterceptors(NoFilesInterceptor())
  update(@Param('id') id: string, @Body() updateMembreDto: UpdateMembreDto) {
    return this.membresService.update(+id, updateMembreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.membresService.remove(+id);
  }
}
