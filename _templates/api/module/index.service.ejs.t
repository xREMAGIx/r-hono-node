---
to: src/services/<%= h.changeCase.lower(mainFolder) %>/<%= h.changeCase.camel(name) %>/<%= h.changeCase.camel(name) %>.service.ts
---
import { <%= h.changeCase.pascal(name) %> } from "@/models/<%= h.changeCase.lower(mainFolder) %>/<%= h.changeCase.camel(name) %>.model";
import {
  Fn<%= h.changeCase.pascal(name) %>Params,
} from "./types";

export const fn<%= h.changeCase.pascal(name) %> = async (
  params: Fn<%= h.changeCase.pascal(name) %>Params
): Promise<<%= h.changeCase.pascal(name) %>> => {
    //* Process

    //* Response
    // return result;
};

