import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";

const tags = ["Auth"];

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  name: z.string().min(1),
  addr1: z.string().optional(),
  addr2: z.string().optional(),
});

export const signup = createRoute({
  path: "/signup",
  method: "post",
  tags,
  request: {
    body: jsonContentRequired(signupSchema, "회원가입 정보"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ id: z.number(), email: z.string(), name: z.string() }),
      "회원가입 성공",
    ),
    [HttpStatusCodes.CONFLICT]: jsonContent(
      z.object({ message: z.string() }),
      "이미 등록된 이메일",
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({ message: z.string() }),
      "필수 입력값 누락 또는 형식 오류",
    ),
  },
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const login = createRoute({
  path: "/login",
  method: "post",
  tags,
  request: {
    body: jsonContentRequired(loginSchema, "로그인 정보"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ id: z.number(), email: z.string(), name: z.string() }),
      "로그인 성공",
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      z.object({ message: z.string() }),
      "이메일 또는 비밀번호가 올바르지 않음",
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({ message: z.string() }),
      "필수 입력값 누락 또는 형식 오류",
    ),
  },
});

export const checkPassword = createRoute({
  path: "/check-password",
  method: "post",
  tags,
  request: {
    body: jsonContentRequired(loginSchema, "비밀번호 확인 정보"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ message: z.string() }),
      "비밀번호 일치",
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      z.object({ message: z.string() }),
      "비밀번호 불일치",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      z.object({ message: z.string() }),
      "등록되지 않은 이메일",
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({ message: z.string() }),
      "필수 입력값 누락 또는 형식 오류",
    ),
  },
});
