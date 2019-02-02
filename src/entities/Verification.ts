import {
    BaseEntity,
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

@Entity()
class Verification extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;
  
    @Column({ type: "text" })
    payload: string;
  
    @Column({ type: "text" })
    key: string;
  
    @Column({type: "boolean", default: "false"})
    verified: boolean;

    @CreateDateColumn() createdAt: string;

    @UpdateDateColumn() updatedAt: string;

    @BeforeInsert()
    createKey(): void {
        this.key = Math.random().toString(36).substr(2);
    }
}

export default Verification;