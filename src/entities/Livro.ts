import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("books")
export class Livro {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", nullable: false, unique: true })
  title!: string;

  @Column({ type: "text", nullable: false })
  description!: string;

  @Column({ type: "date", nullable: false })
  publication_date!: Date;

  @Column({ type: "varchar", nullable: false, unique: true })
  isbn!: string;

  @Column({ type: "int", nullable: false })
  page_count!: number;

  @Column({ type: "varchar", nullable: false })
  language!: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updated_at!: Date;
}
