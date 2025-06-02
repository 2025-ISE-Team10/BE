import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { createMessageObjectSchema } from "stoker/openapi/schemas";

import { createRouter } from "@/lib/create-app";

import authRouter from "./auth/auth.index";
import productsRouter from "./products/products.index";
import cartRouter from "./cart/cart.index";
import ordersRouter from "./orders/orders.index";

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
  .route("/api/auth", authRouter)
  .route("/api/products", productsRouter)
  .route("/api/cart", cartRouter)
  .route("/api/orders", ordersRouter);

export default router;
