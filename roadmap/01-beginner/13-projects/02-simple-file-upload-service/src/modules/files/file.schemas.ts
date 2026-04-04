import { z } from "zod";

export const fileIdParamsSchema = z.object({
  fileId: z.string().min(1),
});

export const fileListQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(50).default(10),
});

export type FileListQuery = z.infer<typeof fileListQuerySchema>;
