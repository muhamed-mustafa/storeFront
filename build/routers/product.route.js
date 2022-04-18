"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controllers/product.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
exports.productRouter = router;
router.get('/product', auth_middleware_1.verifyAuthToken, product_controller_1.getAllProducts);
router.get('/product/:id', auth_middleware_1.verifyAuthToken, product_controller_1.showProductById);
router.post('/product', auth_middleware_1.verifyAuthToken, product_controller_1.createProduct);
