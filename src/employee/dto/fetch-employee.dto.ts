import { IsNumberString } from 'class-validator';

export class FetchEmployeeDto {
  @IsNumberString()
  cpf: string;
}
