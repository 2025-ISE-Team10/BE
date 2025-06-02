import { createRouter } from "@/lib/create-app";

import * as handlers from "./orders.handlers";
import * as routes from "./orders.routes";

const router = createRouter()
  .openapi(routes.createOrder, handlers.createOrder)
  .openapi(routes.getOrders, handlers.getOrders);

export default router;
