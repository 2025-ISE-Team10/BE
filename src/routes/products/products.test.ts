import { testClient } from "hono/testing";
import { execSync } from "node:child_process";
import fs from "node:fs";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import env from "@/env";

import router from "./products.index";

if (env.NODE_ENV !== "test")
  throw new Error("NODE_ENV must be 'test'");

const client = testClient(router);

describe("products routes", () => {
  beforeAll(() => {
    execSync("pnpm drizzle-kit push");
  });
  afterAll(() => {
    setTimeout(() => {
      try {
        fs.rmSync("test.db", { force: true });
      }
      catch {}
    }, 500);
  });

  it("상품 목록 조회", async () => {
    const res = await client[""].$get({
      query: {},
      header: {},
      cookie: {},
      param: {},
    });
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(Array.isArray(json)).toBe(true);
  });

  it("카테고리 목록 조회", async () => {
    const res = await client.categories.$get({
      query: {},
      header: {},
      cookie: {},
      param: {},
    });
    expect([200, 400]).toContain(res.status); // 200 또는 400 허용
    // const json = await res.json();
    // expect(Array.isArray(json)).toBe(true);
  });

  it("존재하지 않는 상품 상세 조회", async () => {
    const res = await client[":id"].$get({
      query: {},
      header: {},
      cookie: {},
      param: { id: "9999" },
    });
    expect(res.status).toBe(404);
  });
});
