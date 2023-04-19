import { Router } from "express";
import { productRouter } from "./productsRoute";
import { usersRouter } from "./usersRoute";
import { cartsRouter } from "./cartRouter";

const routes = Router();

routes.use(productRouter)
      .use(usersRouter)
      .use(cartsRouter)
;
        

export { routes };
