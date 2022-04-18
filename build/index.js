"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("./routers/user.route");
const product_route_1 = require("./routers/product.route");
const order_route_1 = require("./routers/order.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use([user_route_1.usersRouter, product_route_1.productRouter, order_route_1.orderRouter]);
const port = 3000 || process.env.PORT;
app.listen(port, () => console.log(`Listening to port ${port}`));
exports.default = app;
