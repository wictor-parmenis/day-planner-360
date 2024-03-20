import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1710897356631 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "tags" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "description" varchar NOT NULL,
        "created_at" timestamp with time zone NOT NULL DEFAULT now(),
        "updated_at" timestamp with time zone NOT NULL DEFAULT now()
      );

      CREATE TABLE "tasks" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "title" varchar NOT NULL,
        "description" varchar NOT NULL,
        "estimated_duration" integer NOT NULL,
        "date_execution" varchar NOT NULL,
        "created_at" timestamp with time zone NOT NULL DEFAULT now(),
        "updated_at" timestamp with time zone NOT NULL DEFAULT now()
      );

      CREATE TABLE "tasks_tags" (
        "taskId" uuid NOT NULL,
        "tagId" uuid NOT NULL,
        PRIMARY KEY ("taskId", "tagId"),
        CONSTRAINT "FK_taskId" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_tagId" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tasks_tags";`);
    await queryRunner.query(`DROP TABLE "tasks";`);
    await queryRunner.query(`DROP TABLE "tags";`);
  }
}
