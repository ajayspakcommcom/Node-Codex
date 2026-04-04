import fs from "node:fs/promises";
import path from "node:path";

import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";

import { app } from "../src/app";
import { env } from "../src/config/env";
import { fileMetadataRepository } from "../src/modules/files/file.repository";
import { clearUploadDirectory, ensureUploadDirectory } from "../src/modules/files/storage/disk-storage.service";

describe("File upload API", () => {
  beforeEach(async () => {
    fileMetadataRepository.reset();
    await ensureUploadDirectory();
    await clearUploadDirectory();
  });

  it("uploads a file and returns metadata", async () => {
    const response = await request(app)
      .post("/files")
      .attach("file", Buffer.from("hello world"), {
        filename: "notes.txt",
        contentType: "text/plain",
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.originalName).toBe("notes.txt");

    const storedEntries = await fs.readdir(env.uploadDir);
    expect(storedEntries.some((entry) => entry !== ".gitkeep")).toBe(true);
  });

  it("rejects unsupported mime types", async () => {
    const response = await request(app)
      .post("/files")
      .attach("file", Buffer.from("binary content"), {
        filename: "danger.exe",
        contentType: "application/x-msdownload",
      });

    expect(response.status).toBe(415);
    expect(response.body.error.code).toBe("UNSUPPORTED_MEDIA_TYPE");
  });

  it("lists uploaded files and fetches one by id", async () => {
    const uploadResponse = await request(app)
      .post("/files")
      .attach("file", Buffer.from("contract"), {
        filename: "contract.pdf",
        contentType: "application/pdf",
      });

    const fileId = uploadResponse.body.data.id as string;

    const listResponse = await request(app).get("/files?page=1&pageSize=10");
    const getResponse = await request(app).get(`/files/${fileId}`);

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.data).toHaveLength(1);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.data.id).toBe(fileId);
  });
});
