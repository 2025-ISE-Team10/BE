import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";

const tags = ["Orders"];

export const createOrder = createRoute({
  method: "post",
  path: "/",
  tags,
  request: {
    headers: z.object({
      "x-user-id": z.string().describe("유저 ID"),
    }),
    body: jsonContentRequired(
      z.object({
        shipaddr1: z.string(),
        shipaddr2: z.string().optional(),
        items: z.array(
          z.object({
            product_id: z.number(),
            quantity: z.number(),
            price: z.number(),
          }),
        ),
      }),
      "주문 정보",
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ orderId: z.number() }),
      "주문 성공",
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      z.object({ message: z.string() }),
      "로그인 필요",
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({ message: z.string() }),
      "잘못된 요청",
    ),
  },
});

export const getOrders = createRoute({
  method: "get",
  path: "/",
  tags,
  request: {
    headers: z.object({
      "x-user-id": z.string().describe("유저 ID"),
    }),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(
        z.object({
          id: z.number(),
          order_date: z.number(),
          shipaddr1: z.string(),
          shipaddr2: z.string().nullable(),
          total_cost: z.number(),
        }),
      ),
      "주문 목록",
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      z.object({ message: z.string() }),
      "로그인 필요",
    ),
  },
});
