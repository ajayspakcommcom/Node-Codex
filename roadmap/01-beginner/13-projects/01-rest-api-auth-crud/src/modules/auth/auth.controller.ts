import type { Request, Response } from "express";

import { successResponse } from "../../shared/http/api-response";
import { AuthService } from "./auth.service";
import type { LoginInput, RegisterInput } from "./auth.schemas";

export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  public register = async (request: Request, response: Response): Promise<void> => {
    const result = await this.authService.register(request.body as RegisterInput);
    response.status(201).json(successResponse(result));
  };

  public login = async (request: Request, response: Response): Promise<void> => {
    const result = await this.authService.login(request.body as LoginInput);
    response.status(200).json(successResponse(result));
  };
}
