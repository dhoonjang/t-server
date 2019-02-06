import bcrypt from 'bcryptjs';
import { IsEmail } from 'class-validator';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm';
import Chat from './Chat';
import Message from './Message';
import Couple from './Couple';

const BCRYPT_ROUNDS = 10;

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text" })
  @IsEmail()
  email: string;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "text" })
  password: string;
  
  @Column({ type: "text" })
  gender: string;
  
  @Column({ type: "text", nullable: true})
  introduction: string;

  @Column({ type: "int", nullable: true })
  age: number;

  @Column({ type: "boolean", default: false })
  isVerified: boolean;

  @Column({ type: "boolean", default: false })
  isMatched: boolean;

  @Column({ type: "double precision", default: 0 })
  lastLng: number;

  @Column({ type: "double precision", default: 0 })
  lastLat: number;

  @Column({ type: "double precision", default: 0 })
  lastOrientation: number;

  @ManyToOne(type => Chat, chat => chat.users)
  chat: Chat;

  @OneToMany(type => Message, message => message.user)
  messages: Message[];

  @Column({ nullable: true })
  coupleId: number;

  @ManyToOne(type => Couple, couple => couple.users)
  couple: Couple;

  @CreateDateColumn() createdAt: string;

  @UpdateDateColumn() updatedAt: string;

  public comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async savePassword(): Promise<void> {
    if (this.password) {
      const hashedPassword = await this.hashPassword(this.password);
      this.password = hashedPassword;
    }
  }

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
  }
}

export default User;