import { testClient } from "hono/testing";
import { execSync } from "node:child_process";
import fs from "node:fs";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import env from "@/env";

import router from "./auth.index";

if (env.NODE_ENV !== "test")
  throw new Error("NODE_ENV must be 'test'");

const client = testClient(router);

describe("auth routes", () => {
  beforeAll(() => {
    try {
      fs.rmSync("test.db", { force: true });
    }
    catch {}
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

  const email = `test${Date.now()}@example.com`; // 매번 새로운 이메일 사용
  const password = "pw1234";
  const name = "테스터";

  it("회원가입 성공", async () => {
    const res = await client.signup.$post({
      // @ts-expect-error testClient 타입 한계로 인해 json 필드 사용
      json: { email, password, name },
    });
    expect(res.status).toBe(200);
    const json = await res.json() as { email: string; name: string };
    expect(json.email).toBe(email);
    expect(json.name).toBe(name);
  });

  it("중복 이메일 회원가입 실패", async () => {
    const res = await client.signup.$post({
      // @ts-expect-error testClient 타입 한계로 인해 json 필드 사용
      json: { email, password, name },
    });
    expect(res.status).toBe(409);
  });

  it("로그인 성공", async () => {
    const res = await client.login.$post({
      // @ts-expect-error testClient 타입 한계로 인해 json 필드 사용
      json: { email, password },
    });
    expect(res.status).toBe(200);
    const json = await res.json() as { email: string };
    expect(json.email).toBe(email);
  });

  it("로그인 실패", async () => {
    const res = await client.login.$post({
      // @ts-expect-error testClient 타입 한계로 인해 json 필드 사용
      json: { email: "wrong@example.com", password: "wrong" },
    });
    expect(res.status).toBe(401);
  });

  it("비밀번호 확인 성공", async () => {
    const res = await client["check-password"].$post({
      // @ts-expect-error testClient 타입 한계로 인해 json 필드 사용
      json: { email, password },
    });
    expect(res.status).toBe(200);
    const json = await res.json() as { message: string };
    expect(json.message).toMatch(/일치/);
  });

  it("잘못된 비밀번호 확인 실패", async () => {
    const res = await client["check-password"].$post({
      // @ts-expect-error testClient 타입 한계로 인해 json 필드 사용
      json: { email, password: "wrong" },
    });
    expect(res.status).toBe(401);
  });
});
