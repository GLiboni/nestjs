import { CreationRequestDTO, UpdateRequestDTO } from './../../common/types/base.types';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// tslint:disable-next-line: max-classes-per-file
export class UserCreationRequestDTO extends CreationRequestDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public firstName: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public lastName: string;
  @ApiProperty()
  @IsBoolean()
  public isActive: boolean;
}

// tslint:disable-next-line: max-classes-per-file
export class UserUpdateRequestDTO extends UpdateRequestDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public firstName: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public lastName: string;
  @ApiProperty()
  @IsBoolean()
  public isActive: boolean;
}