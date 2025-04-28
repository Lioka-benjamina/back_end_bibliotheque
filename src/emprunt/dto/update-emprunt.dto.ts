import { PartialType } from '@nestjs/swagger';
import { CreateEmpruntDto } from './create-emprunt.dto';

export class UpdateEmpruntDto extends PartialType(CreateEmpruntDto) {}
