import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";

const tags = ["Cart"];

export const getCart = createRoute({
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
          product_id: z.number(),
          quantity: z.number(),
          price: z.number(),
        }),
      ),
      "장바구니 목록",
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      z.object({ message: z.string() }),
      "로그인 필요",
    ),
  },
});

export const addCartItem = createRoute({
  method: "post",
  path: "/items",
  tags,
  request: {
    headers: z.object({
      "x-user-id": z.string().describe("유저 ID"),
    }),
    body: jsonContentRequired(
      z.object({
        product_id: z.number(),
        quantity: z.number(),
      }),
      "장바구니 추가 정보",
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ id: z.number() }),
      "추가 성공",
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      z.object({ message: z.string() }),
      "로그인 필요",
    ),
  },
});

export const updateCartItem = createRoute({
  method: "patch",
  path: "/items/:itemId",
  tags,
  request: {
    headers: z.object({
      "x-user-id": z.string().describe("유저 ID"),
    }),
    params: z.object({ itemId: z.string() }),
    body: jsonContentRequired(
      z.object({ quantity: z.number() }),
      "수량 변경",
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ id: z.number(), quantity: z.number() }),
      "수정 성공",
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      z.object({ message: z.string() }),
      "로그인 필요",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      z.object({ message: z.string() }),
      "아이템 없음",
    ),
  },
});

export const deleteCartItem = createRoute({
  method: "delete",
  path: "/items/:itemId",
  tags,
  request: {
    headers: z.object({
      "x-user-id": z.string().describe("유저 ID"),
    }),
    params: z.object({ itemId: z.string() }),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ success: z.boolean() }),
      "삭제 성공",
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      z.object({ message: z.string() }),
      "로그인 필요",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      z.object({ message: z.string() }),
      "아이템 없음",
    ),
  },
});
