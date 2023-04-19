"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
var express_1 = require("express");
var product_controller_1 = require("../controller/product.controller");
var productRouter = (0, express_1.Router)();
exports.productRouter = productRouter;
productRouter.post("/addProduct", product_controller_1.createProduct);
