import { Router } from "express";
import multer from "multer";

import { env } from "../../config/env";
import { UnsupportedMediaTypeError } from "../../shared/errors/app-error";
import { asyncHandler } from "../../shared/http/async-handler";
import { validateParams, validateQuery } from "../../shared/validation/validate";
import { FileController } from "./file.controller";
import { fileIdParamsSchema, fileListQuerySchema } from "./file.schemas";
import { fileMetadataRepository } from "./file.repository";
import { FileService } from "./file.service";
import { deleteFile, saveFile } from "./storage/disk-storage.service";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: env.maxFileSizeBytes,
  },
  fileFilter: (_request, file, callback) => {
    if (!env.allowedMimeTypes.includes(file.mimetype)) {
      callback(new UnsupportedMediaTypeError("Uploaded file type is not allowed."));
      return;
    }

    callback(null, true);
  },
});

const fileService = new FileService(fileMetadataRepository, saveFile, deleteFile);
const fileController = new FileController(fileService);

export const fileRoutes = Router();

fileRoutes.post("/", upload.single("file"), asyncHandler(fileController.upload));
fileRoutes.get("/", validateQuery(fileListQuerySchema), asyncHandler(fileController.list));
fileRoutes.get("/:fileId", validateParams(fileIdParamsSchema), asyncHandler(fileController.getById));
