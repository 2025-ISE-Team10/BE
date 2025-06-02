// SQLite 개발환경 기준 스키마입니다.
// 운영환경(PostgreSQL)에서는 import만 pg-core로 바꿔주면 됩니다.
// import { pgTable as table, ... } from "drizzle-orm/pg-core"; // 운영환경
import { integer, real, sqliteTable as table, text } from "drizzle-orm/sqlite-core";

// 카테고리 테이블
export const categories = table("categories", {
  category_id: integer("category_id").primaryKey({ autoIncrement: true }),
  name: text("name"),
  desc: text("desc"),
});

// 상품 테이블
export const products = table("products", {
  product_id: integer("product_id").primaryKey({ autoIncrement: true }),
  category_id: integer("category_id").notNull().references(() => categories.category_id, { onDelete: "cascade" }),
  title: text("title"),
  desc: text("desc"),
  price: integer("price"), // 센트 단위 정수
  rating: real("rating"),
  likes: integer("likes"),
  onSale: integer("onSale", { mode: "boolean" }).notNull().default(false),
  image: text("image"),
});

// 유저 테이블 (모든 user는 구매자)
export const users = table("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  addr1: text("addr1"),
  addr2: text("addr2"),
  password: text("password").notNull(),
});

// 장바구니 테이블
export const cart = table("cart", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  user_id: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  product_id: integer("product_id").notNull().references(() => products.product_id, { onDelete: "cascade" }),
  quantity: integer("quantity"),
  price: integer("price"), // 센트 단위 정수
});

// 주문 테이블
export const orders = table("orders", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  buyer_id: integer("buyer_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  order_date: integer("order_date"),
  shipaddr1: text("shipaddr1"),
  shipaddr2: text("shipaddr2"),
  total_cost: integer("total_cost"), // 센트 단위 정수
});
