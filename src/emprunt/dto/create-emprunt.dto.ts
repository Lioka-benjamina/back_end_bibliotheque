import { Type } from 'class-transformer';
import { IsDateString, IsInt } from 'class-validator';

export class CreateEmpruntDto {
  @IsInt()
  @Type(() => Number) // <-- ceci convertit la string en nombre automatiquement
  id: number;

  @IsInt()
  @Type(() => Number) // <-- ceci convertit la string en nombre automatiquement
  membre: number;

  @IsInt()
  @Type(() => Number) // <-- ceci convertit la string en nombre automatiquement
  livre: number;

  @IsDateString()
  date_emprunt: string;

  @IsDateString()
  date_retour: string;
}

