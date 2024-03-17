---
to: migrations/<%= Date.now() %>_<%= h.changeCase.snake(name).replaceAll("_", "-") %>.ts
---

import { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  // Migration code
}

export async function down(db: Kysely<any>): Promise<void> {
  // Migration code
}