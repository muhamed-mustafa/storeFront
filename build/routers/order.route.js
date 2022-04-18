"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("../controllers/order.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
exports.orderRouter = router;
router.get('/orders/:userId', auth_middleware_1.verifyAuthToken, order_controller_1.getAllOrders);
router.get('/order/:id', auth_middleware_1.verifyAuthToken, order_controller_1.showOrderById);
router.post('/order', auth_middleware_1.verifyAuthToken, order_controller_1.createOrder);
