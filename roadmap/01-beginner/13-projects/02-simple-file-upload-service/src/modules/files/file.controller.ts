import type { Request, Response } from "express";

import { successResponse } from "../../shared/http/api-response";
import type { FileListQuery } from "./file.schemas";
import { FileService } from "./file.service";

export class FileController {
  public constructor(private readonly fileService: FileService) {}

  public upload = async (request: Request, response: Response): Promise<void> => {
    const file = await this.fileService.upload({
      file: request.file,
      requestId: request.requestId,
    });

    response.status(201).json(successResponse(file));
  };

  public list = async (request: Request, response: Response): Promise<void> => {
    const result = this.fileService.list(request.query as unknown as FileListQuery);
    response.status(200).json(successResponse(result.items, result.meta));
  };

  public getById = async (request: Request, response: Response): Promise<void> => {
    const { fileId } = request.params as { fileId: string };
    const file = this.fileService.getById(fileId);
    response.status(200).json(successResponse(file));
  };
}
