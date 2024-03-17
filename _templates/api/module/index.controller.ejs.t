---
to: src/controllers/<%= h.changeCase.lower(mainFolder) %>/<%= h.changeCase.camel(name) %>.controller.ts
---
import {
} from "@/schemas/<%= h.changeCase.lower(mainFolder) %>/<%= h.changeCase.camel(name) %>/schemas";
import { ApiError } from "@/middlewares/apiError";
import * as <%= h.changeCase.camel(name) %>Service from "@/services/<%= h.changeCase.lower(mainFolder) %>/<%= h.changeCase.camel(name) %>/<%= h.changeCase.camel(name) %>.service";
import { Handler } from "hono";
import type { StatusCode } from "hono/utils/http-status";
import httpStatus from "http-status";

export const fn<%= h.changeCase.camel(name) %>Handler: Handler = async (c) => {
    //* Queries, params, request body
    // const queryParse = c.req.query();
    // const paramParse = c.req.param();
    // const bodyParse = c.req.json();

    //* Parse 
    // const param = fn<%= h.changeCase.pascal(name) %>Schema.parse(paramParse);
    
    //* Services
    // const result = await <%= h.changeCase.camel(name) %>Service.fn(param);

    //* Response
    // return c.json(
    //   {
    //     data: result,
    //   },
    //   httpStatus.OK as StatusCode
    // );
};
