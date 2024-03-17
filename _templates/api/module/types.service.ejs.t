---
to: src/services/<%= h.changeCase.lower(mainFolder) %>/<%= h.changeCase.camel(name) %>/types.ts
---
//* Data
export interface <%= h.changeCase.pascal(name) %>Data {
  id: number;
}