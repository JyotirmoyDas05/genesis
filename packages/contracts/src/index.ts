import { z } from "zod";

/**
 * Shared Genesis Contracts & Schemas
 */

export const UserRoleSchema = z.enum(["ADMIN", "CURATOR", "ANNOTATOR"]);
export type UserRole = z.infer<typeof UserRoleSchema>;

export const AnnotationTaskTypeSchema = z.enum([
  "COREF",
  "NER",
  "POS",
  "WSD",
]);
export type AnnotationTaskType = z.infer<typeof AnnotationTaskTypeSchema>;

export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema.optional(),
    message: z.string().optional(),
    timestamp: z.string().optional(),
  });
