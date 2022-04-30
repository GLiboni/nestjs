import { CreationRequestDTO, UpdateRequestDTO } from './../../common/types/base.types';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UserCreationRequestDTO extends CreationRequestDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Field()
  public firstName: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Field()
  public lastName: string;
  @ApiProperty()
  @IsBoolean()
  @Field(type => Boolean)
  public isActive: boolean;
}

// tslint:disable-next-line: max-classes-per-file
@InputType()
export class UserUpdateRequestDTO extends UpdateRequestDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Field()
  public firstName: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Field()
  public lastName: string;
  @ApiProperty()
  @IsBoolean()
  @Field(type => Boolean)
  public isActive: boolean;
}