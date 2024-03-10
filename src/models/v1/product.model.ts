import { BaseModel } from "@/models/base.model";
import { ProductData } from "@/services/v1/product/types";

export class Product extends BaseModel implements ProductData {
  id: number;
  name: string | null;
  desc: string;

  private_fields = [];

  constructor(product: ProductData) {
    super();
    this.id = product.id;
    this.name = product.name || null;
    this.desc = product.desc;
  }
}
