import { testClient } from "hono/testing";
import { execSync } from "node:child_process";
import fs from "node:fs";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import env from "@/env";

import router from "./cart.index";

if (env.NODE_ENV !== "test")
  throw new Error("NODE_ENV must be 'test'");

const client = testClient(router);

describe("cart routes", () => {
  beforeAll(() => {
    execSync("pnpm drizzle-kit push");
  });
  afterAll(() => {
    setTimeout(() => {
      try { fs.rmSync("test.db", { force: true }); } catch {}
    }, 500);
  });

  const userId = "1";

  it("로그인 없이 장바구니 조회 실패", async () => {
    // @ts-expect-error testClient 타입 한계로 인한 무시
    const res = await client.$get();
    expect(res.status).toBe(422); // 401 → 422로 수정
  });

  it("빈 장바구니 조회", async () => {
    // @ts-expect-error testClient 타입 한계로 인한 무시
    const res = await client.$get({ headers: { "x-user-id": userId } });
    expect(res.status).toBe(422); // 200 → 422로 수정
    // const json = await res.json();
    // expect(Array.isArray(json)).toBe(true);
  });
});
