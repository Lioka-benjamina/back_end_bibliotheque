import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { EmpruntService } from './emprunt.service';
import { CreateEmpruntDto } from './dto/create-emprunt.dto';
import { UpdateEmpruntDto } from './dto/update-emprunt.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { NoFilesInterceptor } from '@nestjs/platform-express';

@ApiTags("emprunt")
@Controller('emprunt')
export class EmpruntController {
  constructor(private readonly empruntService: EmpruntService) {}

  @Post()
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema : {
      type : "object",
      properties : {
        membre: { type: 'integer'},
        livre: { type: 'integer'},
        date_emprunt: { type: 'string', format: 'date' },
        date_retour: { type: 'string', format: 'date' }
      }
    }
  })
  @UseInterceptors(NoFilesInterceptor())
  create(@Body() createEmpruntDto: CreateEmpruntDto) {
    return this.empruntService.create(createEmpruntDto);
  }

  @Get()
  findAll() {
    return this.empruntService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empruntService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmpruntDto: UpdateEmpruntDto) {
    return this.empruntService.update(+id, updateEmpruntDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empruntService.remove(+id);
  }
}
