import "reflect-metadata";
import { DataSource } from "typeorm";
import { Livro } from "../entities/Livro";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "novasenha",
  database: "api_biblioteca",
  synchronize: false,
  logging: true,
  entities: ["src/entities/**/*.ts"],
  migrations: ["src/database/migrations/**/*.ts"],
  subscribers: [],
});
