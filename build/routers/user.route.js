"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
exports.usersRouter = router;
router.get('/users', auth_middleware_1.verifyAuthToken, user_controller_1.getAllUsers);
router.get('/users/:id', auth_middleware_1.verifyAuthToken, user_controller_1.showUserById);
router.post('/users', user_controller_1.createUser);
