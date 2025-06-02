import { and, eq } from "drizzle-orm";

import type { AppRouteHandler } from "@/lib/types";

import db from "@/db";
import { cart, orders } from "@/db/schema";

function getUserIdFromHeader(c: any): number | null {
  const userId = c.req.header("x-user-id");// 헤더에서 유저 id를 x-user-id로 가져온다고 가정
  if (!userId)
    return null;
  const n = Number(userId);
  return Number.isNaN(n) ? null : n;
}

export const createOrder: AppRouteHandler<any> = async (c) => {
  const userId = getUserIdFromHeader(c);
  if (!userId)
    return c.json({ message: "로그인이 필요합니다." }, 401);
  const body = await c.req.json();
  if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
    return c.json({ message: "주문 상품이 없습니다." }, 400);
  }
  const total_cost = body.items.reduce(
    (sum: number, item: { price: number; quantity: number }) => sum + (item.price * item.quantity),
    0,
  );
  const [order] = await db
    .insert(orders)
    .values({
      buyer_id: userId,
      order_date: Date.now(),
      shipaddr1: body.shipaddr1,
      shipaddr2: body.shipaddr2 ?? null,
      total_cost,
    })
    .returning();
  // 주문 후 장바구니 비우기 (주문한 상품만)
  await db.delete(cart).where(and(eq(cart.user_id, userId)));
  return c.json({ orderId: order.id });
};

export const getOrders: AppRouteHandler<any> = async (c) => {
  const userId = getUserIdFromHeader(c);
  if (!userId)
    return c.json({ message: "로그인이 필요합니다." }, 401);
  const result = await db.select().from(orders).where(eq(orders.buyer_id, userId));
  return c.json(result);
};
