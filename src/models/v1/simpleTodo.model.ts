import { BaseModel } from "@/models/base.model";
import { SimpleTodoData } from "@/services/v1/simpleTodo/types";

export class SimpleTodo extends BaseModel implements SimpleTodoData {
  //* Properties
  id: number;
  name: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;

  //* Private properties
  private_fields = [];

  //* Constructor
  constructor(simpleTodo: SimpleTodoData) {
    super();
    this.id = simpleTodo.id;
    this.name = simpleTodo.name;
    this.isCompleted = simpleTodo.isCompleted;
    this.createdAt = simpleTodo.createdAt;
    this.updatedAt = simpleTodo.updatedAt;
  }
}
