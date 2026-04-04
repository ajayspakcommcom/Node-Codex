import { randomUUID } from "node:crypto";

import { NotFoundError, ValidationError } from "../../shared/errors/app-error";
import type { PaginationMeta } from "../../shared/http/api-response";
import { logger } from "../../shared/logger";
import type { FileListQuery } from "./file.schemas";
import type { FileMetadataDto, FileMetadataRecord } from "./file.types";
import type { FileMetadataRepository } from "./file.repository";
import type { deleteFile, saveFile } from "./storage/disk-storage.service";

interface UploadInput {
  readonly file: Express.Multer.File | undefined;
  readonly requestId: string | undefined;
}

interface PaginatedFilesResult {
  readonly items: readonly FileMetadataDto[];
  readonly meta: PaginationMeta;
}

type SaveFileFn = typeof saveFile;
type DeleteFileFn = typeof deleteFile;

export class FileService {
  public constructor(
    private readonly repository: FileMetadataRepository,
    private readonly saveStoredFile: SaveFileFn,
    private readonly deleteStoredFile: DeleteFileFn,
  ) {}

  public async upload(input: UploadInput): Promise<FileMetadataDto> {
    if (!input.file) {
      throw new ValidationError("A file must be provided.");
    }

    const storedFile = await this.saveStoredFile({
      originalName: input.file.originalname,
      buffer: input.file.buffer,
    });

    const metadataRecord: FileMetadataRecord = {
      id: `file_${randomUUID()}`,
      originalName: input.file.originalname,
      storedFilename: storedFile.storedFilename,
      mimeType: input.file.mimetype,
      sizeInBytes: input.file.size,
      createdAt: new Date().toISOString(),
    };

    try {
      const savedMetadata = this.repository.create(metadataRecord);

      logger.info("File uploaded successfully", {
        requestId: input.requestId,
        fileId: savedMetadata.id,
        mimeType: savedMetadata.mimeType,
        sizeInBytes: savedMetadata.sizeInBytes,
      });

      return this.toDto(savedMetadata);
    } catch (error) {
      await this.deleteStoredFile(storedFile.storedFilename);
      throw error;
    }
  }

  public list(query: FileListQuery): PaginatedFilesResult {
    const records = [...this.repository.list()].sort((left, right) =>
      right.createdAt.localeCompare(left.createdAt),
    );
    const startIndex = (query.page - 1) * query.pageSize;

    return {
      items: records.slice(startIndex, startIndex + query.pageSize).map(this.toDto),
      meta: {
        page: query.page,
        pageSize: query.pageSize,
        totalCount: records.length,
      },
    };
  }

  public getById(fileId: string): FileMetadataDto {
    const record = this.repository.findById(fileId);

    if (!record) {
      throw new NotFoundError("File metadata was not found.");
    }

    return this.toDto(record);
  }

  private toDto = (record: FileMetadataRecord): FileMetadataDto => ({
    id: record.id,
    originalName: record.originalName,
    mimeType: record.mimeType,
    sizeInBytes: record.sizeInBytes,
    createdAt: record.createdAt,
  });
}
