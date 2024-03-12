import {
  deleteProductParamsSchema,
  getProductParamsSchema,
  getProductsParamsSchema,
  updateProductParamsSchema,
} from "@/schemas/v1/product/schemas";
import { ApiError } from "@/middlewares/apiError";
import * as productService from "@/services/v1/product/product.service";
import { Handler } from "hono";
import type { StatusCode } from "hono/utils/http-status";
import httpStatus from "http-status";

export const getProducts: Handler = async (c) => {
  const queryParse = c.req.query();
  const query = getProductsParamsSchema.parse(queryParse);
  const result = await productService.getProducts(query);
  return c.json(
    {
      data: result,
    },
    httpStatus.OK as StatusCode
  );
};

export const getProduct: Handler = async (c) => {
  const paramParse = c.req.param();
  const param = getProductParamsSchema.parse(paramParse);
  const id = param.id;
  const result = await productService.getProduct({ id });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
  }
  return c.json(
    {
      data: result,
    },
    httpStatus.OK as StatusCode
  );
};

export const updateProduct: Handler = async (c) => {
  const paramParse = c.req.param();
  const bodyParse = c.req.json();
  const param = updateProductParamsSchema.parse({
    ...paramParse,
    ...bodyParse,
  });
  const result = await productService.updateProduct(param);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
  }
  return c.json(
    {
      data: result,
    },
    httpStatus.OK as StatusCode
  );
};

export const deleteProduct: Handler = async (c) => {
  const paramParse = c.req.param();
  const param = deleteProductParamsSchema.parse(paramParse);
  const id = param.id;
  await productService.deleteProduct({ id });
  return c.json(
    {
      data: { id },
    },
    httpStatus.OK as StatusCode
  );
};
