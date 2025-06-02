import db from "@/db";
import { products, categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { AppRouteHandler } from "@/lib/types";

export const getProducts: AppRouteHandler<any> = async (c) => {
  const result = await db.select().from(products);
  // onSale: 0/1 → boolean 변환
  const mapped = result.map((p) => ({
    ...p,
    onSale: !!p.onSale,
  }));
  return c.json(mapped);
};

export const getProductById: AppRouteHandler<any> = async (c) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) return c.json({ message: "잘못된 id" }, 400);
  const [p] = await db.select().from(products).where(eq(products.product_id, id));
  if (!p) return c.json({ message: "상품을 찾을 수 없습니다." }, 404);
  return c.json({ ...p, onSale: !!p.onSale });
};

export const getCategories: AppRouteHandler<any> = async (c) => {
  const result = await db.select().from(categories);
  return c.json(result);
};
