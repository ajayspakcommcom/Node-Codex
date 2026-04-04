export interface FileMetadataRecord {
  readonly id: string;
  readonly originalName: string;
  readonly storedFilename: string;
  readonly mimeType: string;
  readonly sizeInBytes: number;
  readonly createdAt: string;
}

export interface FileMetadataDto {
  readonly id: string;
  readonly originalName: string;
  readonly mimeType: string;
  readonly sizeInBytes: number;
  readonly createdAt: string;
}
