import { EntityWithId } from './../common/entity/base.entity';
import { Column, Entity } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType({ description: 'user ' })
export class User extends EntityWithId<number> {
  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column({ default: true })
  @Field()
  isActive: boolean;
}