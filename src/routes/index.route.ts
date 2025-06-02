import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { createMessageObjectSchema } from "stoker/openapi/schemas";

import { createRouter } from "@/lib/create-app";

import authRouter from "./auth/auth.index";

const router = createRouter()
  .openapi(
    createRoute({
      tags: ["Index"],
      method: "get",
      path: "/",
      responses: {
        [HttpStatusCodes.OK]: jsonContent(
          createMessageObjectSchema("E-Commerce API"),
          "E-Commerce API Index",
        ),
      },
    }),
    (c) => {
      return c.json({
        message: "E-Commerce API",
      }, HttpStatusCodes.OK);
    },
  )
  .route("/api/auth", authRouter);

export default router;
