import db from "@/db";
import { cart } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import type { AppRouteHandler } from "@/lib/types";

function getUserIdFromHeader(c: any): number | null {
  const userId = c.req.header("x-user-id");
  if (!userId) return null;
  const n = Number(userId);
  return isNaN(n) ? null : n;
}

export const getCart: AppRouteHandler<any> = async (c) => {
  const userId = getUserIdFromHeader(c);
  if (!userId) return c.json({ message: "로그인이 필요합니다." }, 401);
  const items = await db.select().from(cart).where(eq(cart.user_id, userId));
  return c.json(items);
};

export const addCartItem: AppRouteHandler<any> = async (c) => {
  const userId = getUserIdFromHeader(c);
  if (!userId) return c.json({ message: "로그인이 필요합니다." }, 401);
  const body = await c.req.json();
  const [item] = await db
    .insert(cart)
    .values({
      user_id: userId,
      product_id: body.product_id,
      quantity: body.quantity,
      price: body.price ?? 0,
    })
    .returning();
  return c.json({ id: item.id });
};

export const updateCartItem: AppRouteHandler<any> = async (c) => {
  const userId = getUserIdFromHeader(c);
  if (!userId) return c.json({ message: "로그인이 필요합니다." }, 401);
  const itemId = Number(c.req.param("itemId"));
  if (isNaN(itemId)) return c.json({ message: "잘못된 itemId" }, 400);
  const body = await c.req.json();
  const [updated] = await db
    .update(cart)
    .set({ quantity: body.quantity })
    .where(and(eq(cart.id, itemId), eq(cart.user_id, userId)))
    .returning();
  if (!updated) return c.json({ message: "아이템을 찾을 수 없습니다." }, 404);
  return c.json({ id: updated.id, quantity: updated.quantity });
};

export const deleteCartItem: AppRouteHandler<any> = async (c) => {
  const userId = getUserIdFromHeader(c);
  if (!userId) return c.json({ message: "로그인이 필요합니다." }, 401);
  const itemId = Number(c.req.param("itemId"));
  if (isNaN(itemId)) return c.json({ message: "잘못된 itemId" }, 400);
  const [deleted] = await db
    .delete(cart)
    .where(and(eq(cart.id, itemId), eq(cart.user_id, userId)))
    .returning();
  if (!deleted) return c.json({ message: "아이템을 찾을 수 없습니다." }, 404);
  return c.json({ success: true });
};
