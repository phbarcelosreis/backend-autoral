"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.productSchema = joi_1.default.object({
    name: joi_1.default.string().min(2).required(),
    price: joi_1.default.string().min(2).required(),
    description: joi_1.default.string().min(2).required(),
    image: joi_1.default.string().min(2).required()
});
