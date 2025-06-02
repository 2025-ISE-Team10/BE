import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";

const tags = ["Products"];

export const getProducts = createRoute({
  method: "get",
  path: "/",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(
        z.object({
          product_id: z.number(),
          category_id: z.number(),
          title: z.string(),
          desc: z.string().nullable(),
          price: z.number(),
          rating: z.number().nullable(),
          likes: z.number().nullable(),
          onSale: z.boolean(),
          image: z.string().nullable(),
        }),
      ),
      "상품 목록",
    ),
  },
});

export const getProductById = createRoute({
  method: "get",
  path: "/:id",
  tags,
  request: {
    params: z.object({ id: z.string() }),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        product_id: z.number(),
        category_id: z.number(),
        title: z.string(),
        desc: z.string().nullable(),
        price: z.number(),
        rating: z.number().nullable(),
        likes: z.number().nullable(),
        onSale: z.boolean(),
        image: z.string().nullable(),
      }),
      "상품 상세",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      z.object({ message: z.string() }),
      "상품 없음",
    ),
  },
});

export const getCategories = createRoute({
  method: "get",
  path: "/categories",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(
        z.object({
          category_id: z.number(),
          name: z.string(),
          desc: z.string().nullable(),
        }),
      ),
      "카테고리 목록",
    ),
  },
});
