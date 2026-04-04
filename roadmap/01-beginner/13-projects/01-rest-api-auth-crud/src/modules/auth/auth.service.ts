import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";

import { env } from "../../config/env";
import { AuthenticationError, ConflictError } from "../../shared/errors/app-error";
import type { SafeUser } from "../users/user.types";
import { UserRepository } from "../users/user.repository";
import type { LoginInput, RegisterInput } from "./auth.schemas";

interface AuthResult {
  readonly accessToken: string;
  readonly user: SafeUser;
}

export class AuthService {
  public constructor(private readonly userRepository: UserRepository) {}

  public async register(input: RegisterInput): Promise<AuthResult> {
    const existingUser = this.userRepository.findByEmail(input.email);

    if (existingUser) {
      throw new ConflictError("A user with this email already exists.");
    }

    const passwordHash = await bcrypt.hash(input.password, 10);
    const user = this.userRepository.create({
      email: input.email,
      name: input.name,
      passwordHash,
    });

    return {
      accessToken: this.createToken(user.id, user.email),
      user: this.toSafeUser(user),
    };
  }

  public async login(input: LoginInput): Promise<AuthResult> {
    const user = this.userRepository.findByEmail(input.email);

    if (!user) {
      throw new AuthenticationError("Invalid credentials.");
    }

    const passwordMatches = await bcrypt.compare(input.password, user.passwordHash);

    if (!passwordMatches) {
      throw new AuthenticationError("Invalid credentials.");
    }

    return {
      accessToken: this.createToken(user.id, user.email),
      user: this.toSafeUser(user),
    };
  }

  private createToken(userId: string, email: string): string {
    const signOptions: SignOptions = {
      subject: userId,
      expiresIn: env.jwtExpiresIn as NonNullable<SignOptions["expiresIn"]>,
    };

    return jwt.sign(
      {
        email,
      },
      env.jwtSecret,
      signOptions,
    );
  }

  private toSafeUser(user: {
    readonly id: string;
    readonly email: string;
    readonly name: string;
    readonly createdAt: string;
  }): SafeUser {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };
  }
}
