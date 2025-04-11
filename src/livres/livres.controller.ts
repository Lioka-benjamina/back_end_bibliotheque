import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { LivresService } from './livres.service';
import { CreateLivreDto } from './dto/create-livre.dto';
import { UpdateLivreDto } from './dto/update-livre.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { NoFilesInterceptor } from '@nestjs/platform-express';

@ApiTags("livre")
@Controller('livres')
export class LivresController {
  constructor(private readonly livresService: LivresService) {}

  @Post()
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema : {
      type : "object",
      properties : {
        titre : {type : "string"},
        auteur : {type : "string"},
        categorie : {type : "string"},
        editeur : {type : "string"},
        disponibilite : {type : "string"},
      }
    }
  })
  @UseInterceptors(NoFilesInterceptor())
  create(@Body() createLivreDto: CreateLivreDto) {
    return this.livresService.create(createLivreDto);
  }

  @Get()
  findAll() {
    return this.livresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.livresService.findOne(+id);
  }

  @Patch(':id')
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema : {
      type : "object",
      properties : {
        titre : {type : "string"},
        auteur : {type : "string"},
        categorie : {type : "string"},
        editeur : {type : "string"},
        disponibilite : {type : "string"},
      }
    }
  })
  @UseInterceptors(NoFilesInterceptor())
  update(@Param('id') id: string, @Body() updateLivreDto: UpdateLivreDto) {
    return this.livresService.update(+id, updateLivreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.livresService.remove(+id);
  }
}
