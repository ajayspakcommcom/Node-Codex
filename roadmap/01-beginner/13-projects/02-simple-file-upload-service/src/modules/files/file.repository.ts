import type { FileMetadataRecord } from "./file.types";

const fileMetadataTable: FileMetadataRecord[] = [];

export class FileMetadataRepository {
  public create(fileMetadata: FileMetadataRecord): FileMetadataRecord {
    fileMetadataTable.push(fileMetadata);
    return fileMetadata;
  }

  public list(): readonly FileMetadataRecord[] {
    return fileMetadataTable;
  }

  public findById(fileId: string): FileMetadataRecord | undefined {
    return fileMetadataTable.find((record) => record.id === fileId);
  }

  public reset(): void {
    fileMetadataTable.length = 0;
  }
}

export const fileMetadataRepository = new FileMetadataRepository();
