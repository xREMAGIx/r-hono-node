import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  // Migration code

  await db.schema
    .createTable("user")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("created_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .addColumn("username", "varchar(255)")
    .addColumn("email", "varchar(255)")
    .addColumn("password", "varchar(255)")
    .addColumn("role", "varchar(255)", (col) => col.defaultTo("user"))
    .execute();

  await db.schema
    .createTable("todo")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("created_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .addColumn("name", "varchar(255)")
    .addColumn("description", "varchar(255)")
    .addColumn("owner_id", "integer", (col) =>
      col.references("user.id").notNull()
    )
    .addColumn("is_completed", "boolean", (col) => col.defaultTo(false))
    .execute();

  await db.schema
    .createTable("todo_imgs")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("todo_id", "integer", (col) =>
      col.references("todo.id").onDelete("cascade").notNull()
    )
    .addColumn("path", "varchar(255)")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  // Migration code

  await db.schema.dropTable("user").execute();
  await db.schema.dropTable("todo").execute();
}
