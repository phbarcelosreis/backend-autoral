"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var router_1 = require("./router/router");
var server = (0, express_1.default)();
server.use((0, cors_1.default)());
server.use(express_1.default.json());
server.use(router_1.routes);
var PORT = 4000 || process.env.DATABASE_URL;
server.listen(PORT, function () { return console.log("Server Running at port: ".concat(PORT)); });
