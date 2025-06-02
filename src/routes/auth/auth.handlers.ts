import { eq } from "drizzle-orm";
import { z } from "zod";

import type { AppRouteHandler } from "@/lib/types";

import db from "@/db";
import { users } from "@/db/schema";

export const signup: AppRouteHandler<any> = async (c) => {
  const body = await c.req.json();
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
    name: z.string().min(1),
  });
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: "필수 입력값 누락 또는 형식 오류" }, 400);
  }
  const exists = await db.select().from(users).where(eq(users.email, body.email));
  if (exists.length > 0) {
    return c.json({ error: "이미 등록된 이메일입니다." }, 409);
  }
  const [user] = await db
    .insert(users)
    .values({
      email: body.email,
      password: body.password,
      name: body.name,
      addr1: body.addr1 ?? null,
      addr2: body.addr2 ?? null,
    })
    .returning();
  return c.json({ id: user.id, email: user.email, name: user.name });
};

export const login: AppRouteHandler<any> = async (c) => {
  const body = await c.req.json();
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
  });
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: "필수 입력값 누락 또는 형식 오류" }, 400);
  }
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, body.email));
  if (!user || user.password !== body.password) {
    return c.json({ error: "이메일 또는 비밀번호가 올바르지 않습니다." }, 401);
  }
  return c.json({ id: user.id, email: user.email, name: user.name });
};

export const checkPassword: AppRouteHandler<any> = async (c) => {
  const body = await c.req.json();
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
  });
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: "필수 입력값 누락 또는 형식 오류" }, 400);
  }
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, body.email));
  if (!user) {
    return c.json({ error: "등록되지 않은 이메일입니다." }, 404);
  }
  if (user.password !== body.password) {
    return c.json({ error: "비밀번호가 일치하지 않습니다." }, 401);
  }
  return c.json({ message: "비밀번호가 일치합니다." });
};
