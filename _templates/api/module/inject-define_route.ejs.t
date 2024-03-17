---
inject: true
to: src/routes/<%= h.changeCase.lower(mainFolder) %>/index.ts
after: "const apiRoutes = \\["
skip_if: "/${BASE_PATH}/<%= h.changeCase.snake(name).replaceAll("_", "-") %>"
---
{
    path: `/${BASE_PATH}/<%= h.changeCase.snake(name).replaceAll("_", "-") %>`,
    route: <%= h.changeCase.camel(name) %>Route,
},