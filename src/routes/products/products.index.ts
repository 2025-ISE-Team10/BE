import { createRouter } from "@/lib/create-app";
import * as routes from "./products.routes";
import * as handlers from "./products.handlers";

const router = createRouter()
  .openapi(routes.getProducts, handlers.getProducts)
  .openapi(routes.getProductById, handlers.getProductById)
  .openapi(routes.getCategories, handlers.getCategories);

export default router;
