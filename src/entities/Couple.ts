import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne
} from "typeorm";
import { coupleStatus } from "../types/types";
import User from "./User";
import Chat from "./Chat";
import Place from "./Place";

@Entity()
class Couple extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({
    type: "text",
    enum: ["MATCHING", "FINISHED", "CANCELED", "REQUESTING", "MEETING"],
    default: "REQUESTING"
  })
  status: coupleStatus;

  @OneToMany(type => User, user => user.couple)
  users: User[];

  @Column({ nullable: true })
  placeId: number;

  @ManyToOne(type => Place, place => place.couples, { nullable: true })
  place: Place;

  @Column({ nullable: true })
  chatId: number;

  @OneToOne(type => Chat, chat => chat.couple, { nullable: true })
  @JoinColumn()
  chat: Chat;

  @CreateDateColumn() createdAt: string;

  @UpdateDateColumn() updatedAt: string;
}
export default Couple;