import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany
  } from "typeorm";
import Couple from "./Couple";
  
@Entity()
class Place extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  
  @Column({ type: "text" })
  name: string;
  
  @Column({ type: "double precision", default: 0 })
  lat: number;
  
  @Column({ type: "double precision", default: 0 })
  lng: number;

  @Column({ type: "int", default: 1 })
  star: number;
  
  @Column({ type: "text" })
  address: string;

  @Column({ type: "text", nullable: true })
  explanation: string;
  
  @Column({ type: "boolean", default: false })
  isTaken: boolean;

  @OneToMany(type => Couple, couple => couple.place)
  couples: Couple[];

  @CreateDateColumn() createdAt: string;
  
  @UpdateDateColumn() updatedAt: string;
}

export default Place;