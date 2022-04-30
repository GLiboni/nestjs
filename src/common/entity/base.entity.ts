import { Field, ID, ObjectType } from '@nestjs/graphql';
import { VersionColumn } from 'typeorm';
import { CreateDateColumn } from 'typeorm';
import { UpdateDateColumn } from 'typeorm';
import { Entity as EntityAnnotation, PrimaryGeneratedColumn } from 'typeorm';

@EntityAnnotation()
@ObjectType()
export class Entity {
  @UpdateDateColumn()
  @Field()
  public updated_date: Date;

  @CreateDateColumn()
  @Field()
  public created_date: Date;

  @VersionColumn()
  @Field()
  public version: number;
}

@ObjectType()
export class EntityWithId<T = number> extends Entity {
  @PrimaryGeneratedColumn()
  @Field(type => ID)
  id: T;
}
