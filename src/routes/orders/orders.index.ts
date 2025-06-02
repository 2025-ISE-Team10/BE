import { createRouter } from "@/lib/create-app";
import * as routes from "./orders.routes";
import * as handlers from "./orders.handlers";

const router = createRouter()
  .openapi(routes.createOrder, handlers.createOrder)
  .openapi(routes.getOrders, handlers.getOrders);

export default router;
