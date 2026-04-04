import type { Request, Response } from "express";

import { NotFoundError } from "../../shared/errors/app-error";
import { successResponse } from "../../shared/http/api-response";
import type { SafeUser } from "./user.types";
import { UserRepository } from "./user.repository";

export class UsersController {
  public constructor(private readonly userRepository: UserRepository) {}

  public me = (request: Request, response: Response): void => {
    const user = this.userRepository.findById(request.auth!.userId);

    if (!user) {
      throw new NotFoundError("Authenticated user was not found.");
    }

    const safeUser: SafeUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };

    response.status(200).json(successResponse(safeUser));
  };
}
