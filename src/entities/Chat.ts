import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  OneToOne
} from "typeorm";
  
import Message from "./Message";
import User from "./User";
import Couple from "./Couple";

@Entity()
class Chat extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @OneToMany(type => Message, message => message.chat, {nullable: true})
  messages: Message[];

  @OneToMany(type => User, user => user.chat)
  users: User[];
  
  @Column({ nullable: true })
  coupleId: number;

  @OneToOne(type => Couple, couple => couple.chat)
  couple: Couple;

  @CreateDateColumn() createdAt: string;
  
  @UpdateDateColumn() updatedAt: string;
}
  
export default Chat;