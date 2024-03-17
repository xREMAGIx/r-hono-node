import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  // Migration code
  await db.schema
    .createTable("simple_todo")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("created_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn("name", "varchar(255)", (col) => col.notNull())
    .addColumn("is_completed", "boolean", (col) =>
      col.notNull().defaultTo(false),
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  // Migration code
  await db.schema.dropTable("simple_todo").execute();
}
