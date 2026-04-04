import { Router } from "express";

import { asyncHandler } from "../../shared/http/async-handler";
import { validateBody } from "../../shared/validation/validate";
import { UserRepository } from "../users/user.repository";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { loginSchema, registerSchema } from "./auth.schemas";

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

export const authRoutes = Router();

authRoutes.post("/register", validateBody(registerSchema), asyncHandler(authController.register));
authRoutes.post("/login", validateBody(loginSchema), asyncHandler(authController.login));
