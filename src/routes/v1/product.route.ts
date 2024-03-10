import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";

import * as productController from "@/controllers/v1/product.controller";
import {
  deleteProductParamsSchema,
  getProductDataSchema,
  getProductParamsSchema,
  getProductsDataSchema,
  getProductsParamsSchema,
  updateProductParamsSchema,
} from "@/documentation/v1/product/schema";

export const route = new OpenAPIHono();

const listRoute = createRoute({
  method: "get",
  path: "/",
  request: {
    query: getProductsParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: getProductsDataSchema,
        },
      },
      description: "Product list",
    },
  },
  tags: ["Product"],
});

const detailRoute = createRoute({
  method: "get",
  path: "/{id}",
  request: {
    params: getProductParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: getProductDataSchema,
        },
      },
      description: "Product detail",
    },
  },
  tags: ["Product"],
});

const updateRoute = createRoute({
  method: "put",
  path: "/{id}",
  request: (() => {
    const { id, ...rest } = updateProductParamsSchema.shape;
    return {
      params: z.object({
        id: id,
      }),
      body: {
        content: {
          "application/json": {
            schema: z.object({
              ...rest,
            }),
          },
        },
      },
    };
  })(),
  responses: {
    200: {
      content: {
        "application/json": {
          schema: getProductDataSchema,
        },
      },
      description: "Update product",
    },
  },
  tags: ["Product"],
});

const deleteRoute = createRoute({
  method: "delete",
  path: "/{id}",
  request: {
    params: deleteProductParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: deleteProductParamsSchema,
        },
      },
      description: "Delete product",
    },
  },
  tags: ["Product"],
});

route.openapi(listRoute, productController.getProducts);
route.openapi(detailRoute, productController.getProduct);
route.openapi(updateRoute, productController.updateProduct);
route.openapi(deleteRoute, productController.deleteProduct);
