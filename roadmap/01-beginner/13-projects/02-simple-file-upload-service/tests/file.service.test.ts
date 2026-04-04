import { beforeEach, describe, expect, it, vi } from "vitest";

import { StorageError } from "../src/shared/errors/app-error";
import { FileMetadataRepository } from "../src/modules/files/file.repository";
import { FileService } from "../src/modules/files/file.service";

describe("FileService cleanup behavior", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("deletes the stored file if metadata persistence fails", async () => {
    const repository = new FileMetadataRepository();
    const saveStoredFile = vi.fn().mockResolvedValue({
      storedFilename: "generated.txt",
      absolutePath: "/tmp/generated.txt",
    });
    const deleteStoredFile = vi.fn().mockResolvedValue(undefined);
    const fileService = new FileService(repository, saveStoredFile, deleteStoredFile);

    vi.spyOn(repository, "create").mockImplementation(() => {
      throw new StorageError("Metadata persistence failed.");
    });

    await expect(
      fileService.upload({
        file: {
          fieldname: "file",
          originalname: "notes.txt",
          encoding: "7bit",
          mimetype: "text/plain",
          size: 12,
          buffer: Buffer.from("hello world"),
          stream: undefined as never,
          destination: "",
          filename: "",
          path: "",
        },
        requestId: undefined,
      }),
    ).rejects.toThrow("Metadata persistence failed.");

    expect(deleteStoredFile).toHaveBeenCalledWith("generated.txt");
  });
});
