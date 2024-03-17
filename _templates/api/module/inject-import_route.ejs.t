---
inject: true
to: src/routes/<%= h.changeCase.lower(mainFolder) %>/index.ts
after: "\\/\\/\\* Import route"
skip_if: "@/routes/<%= h.changeCase.lower(mainFolder) %>/<%= h.changeCase.camel(name) %>.route"
---
import { route as <%= h.changeCase.camel(name) %>Route } from "@/routes/<%= h.changeCase.lower(mainFolder) %>/<%= h.changeCase.camel(name) %>.route";