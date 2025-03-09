import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateBooksTable1741548391103 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "books",
        columns: [
          {
            name: "id",
            type: "serial",
            isPrimary: true,
          },
          {
            name: "title",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "description",
            type: "text",
            isNullable: true,
          },
          {
            name: "publication_date",
            type: "date",
            isNullable: false,
          },
          {
            name: "isbn",
            type: "varchar",
            isUnique: true,
            isNullable: false,
          },
          {
            name: "page_count",
            type: "int",
            isNullable: false,
          },
          {
            name: "language",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("books");
  }
}
