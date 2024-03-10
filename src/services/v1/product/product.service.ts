import { Product } from "@/models/v1/product.model";
import {
  GetProductParams,
  GetProductsParams,
  UpdateProductParams,
} from "./types";

const products = [
  {
    id: 1,
    name: "Google Pixel 6 Pro",
    desc: "Test Google Pixel 6 ",
  },
  {
    id: 2,
    name: "Apple iPhone 12 Mini, 256GB, Blue",
    desc: "Test Apple iPhone 12 Mini, 256GB, Blue",
  },
];

export const getProducts = async (
  params: GetProductsParams
): Promise<Product[]> => {
  return products.map((product) => new Product(product));
};

export const getProduct = async ({
  id,
}: GetProductParams): Promise<Product | undefined> => {
  const product = products.find((ele) => ele.id === id);

  return product ? new Product(product) : undefined;
};

export const updateProduct = async ({
  id,
  name,
  desc,
}: UpdateProductParams): Promise<Product | undefined> => {
  const product = products.find((ele) => ele.id === id);

  if (!product) return undefined;

  return new Product({
    ...product,
    name: name ?? product.name,
    desc: desc ?? product.desc,
  });
};

export const deleteProduct = async ({
  id,
}: GetProductParams): Promise<Product | undefined> => {
  const product = products.find((ele) => ele.id === id);

  return;
};
