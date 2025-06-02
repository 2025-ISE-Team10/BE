import { createRouter } from "@/lib/create-app";

import * as handlers from "./cart.handlers";
import * as routes from "./cart.routes";

const router = createRouter()
  .openapi(routes.getCart, handlers.getCart)
  .openapi(routes.addCartItem, handlers.addCartItem)
  .openapi(routes.updateCartItem, handlers.updateCartItem)
  .openapi(routes.deleteCartItem, handlers.deleteCartItem);

export default router;
