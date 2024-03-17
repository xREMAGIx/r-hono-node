import { getDBClient } from "@/config/database";
import dotenv from "dotenv";
import { promises as fs } from "fs";
import { FileMigrationProvider, Migrator, NO_MIGRATIONS } from "kysely";
import * as path from "path";

dotenv.config();

const db = getDBClient();

const migrator = new Migrator({
  db,
  provider: new FileMigrationProvider({
    fs,
    path,
    // This needs to be an absolute path.
    migrationFolder: path.join(process.cwd(), "migrations/"),
  }),
});

async function migrateToLatest() {
  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === "Error") {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error("failed to migrate");
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
}

async function migrateDown() {
  const { error, results } = await migrator.migrateDown();
  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`migration '${it.migrationName}' was reverted successfully`);
    } else if (it.status === "Error") {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error("failed to migrate");
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
}

async function migrateNone() {
  const { error, results } = await migrator.migrateTo(NO_MIGRATIONS);
  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`migration '${it.migrationName}' was reverted successfully`);
    } else if (it.status === "Error") {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error("failed to migrate");
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
}

const migrationArgs = process.argv[2];

switch (migrationArgs) {
  case "down":
    migrateDown();
    break;
  case "lastest":
    migrateToLatest();
    break;
  case "none":
    migrateNone();
    break;
  default:
    break;
}
