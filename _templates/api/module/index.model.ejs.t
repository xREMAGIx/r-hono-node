---
to: src/models/<%= h.changeCase.lower(mainFolder) %>/<%= h.changeCase.camel(name) %>.model.ts
---
import { BaseModel } from "@/models/base.model";
import { <%= h.changeCase.pascal(name) %>Data } from "@/services/<%= h.changeCase.lower(mainFolder) %>/<%= h.changeCase.camel(name) %>/types";

export class <%= h.changeCase.pascal(name) %> extends BaseModel implements <%= h.changeCase.pascal(name) %>Data {
    //* Properties
    id: number;

    //* Private properties
    private_fields = [];

    //* Constructor
    // constructor(<%= h.changeCase.camel(name) %>: <%= h.changeCase.pascal(name) %>Data) {
    //   super();
    //   this.id = <%= h.changeCase.camel(name) %>.id;
    // }
}
