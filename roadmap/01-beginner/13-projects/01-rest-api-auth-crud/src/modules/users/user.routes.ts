import { Router } from "express";

import { UserRepository } from "./user.repository";
import { UsersController } from "./users.controller";

const userRepository = new UserRepository();
const usersController = new UsersController(userRepository);

export const userRoutes = Router();

userRoutes.get("/me", usersController.me);
