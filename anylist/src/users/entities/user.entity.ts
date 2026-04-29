import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'users'})
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  fullName: string;

  @Column({ unique: true })
  @Field(() => String)
  email: string;

  @Column()
  //@Field(() => String)
  password: string;

  @Column({type: "text", array: true,default: ["user"]})
  @Field(() => [String])
  roles: string[];


  @Field(() => Boolean)
  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @ManyToOne(()=>User,(user) => user.lastUpdatedBy, { nullable: true ,lazy: true})
  @JoinColumn({ name: 'last_updated_by' })
  @Field(() => User, { nullable: true })
  lastUpdatedBy?: User;

}
