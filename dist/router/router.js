"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
var express_1 = require("express");
var productsRoute_1 = require("./productsRoute");
var routes = (0, express_1.Router)();
exports.routes = routes;
routes.use(productsRoute_1.productRouter);
