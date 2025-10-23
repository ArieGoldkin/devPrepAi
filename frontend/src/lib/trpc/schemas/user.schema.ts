/**
 * User Zod Schemas
 * Runtime-validated user profile and preference types
 */
import { z } from "zod";

const MAX_YEARS_EXPERIENCE = 50;
const MAX_TECHNOLOGIES_COUNT = 20;

/**
 * Interview type options
 */
export const interviewTypeSchema = z.enum([
  "coding",
  "system-design",
  "behavioral",
]);

/**
 * Company size preference
 */
export const companySizeSchema = z.enum([
  "startup",
  "mid-size",
  "enterprise",
  "any",
]);

/**
 * Role focus areas
 */
export const roleFocusSchema = z.enum([
  "frontend",
  "backend",
  "fullstack",
  "devops",
  "mobile",
]);

/**
 * Experience level
 */
export const experienceLevelSchema = z.enum(["junior", "mid", "senior"]);

/**
 * Interview experience
 */
export const previousInterviewExperienceSchema = z.enum([
  "none",
  "some",
  "extensive",
]);

/**
 * User profile schema with validation
 */
export const userProfileSchema = z.object({
  experienceLevel: experienceLevelSchema,
  yearsOfExperience: z
    .number()
    .int()
    .min(0, "Years of experience must be positive")
    .max(MAX_YEARS_EXPERIENCE, "Years of experience seems too high"),
  technologies: z
    .array(z.string().min(1))
    .min(1, "At least one technology required")
    .max(MAX_TECHNOLOGIES_COUNT, "Too many technologies selected"),
  roleFocus: roleFocusSchema,
  interviewType: interviewTypeSchema,
  companySizePreference: companySizeSchema,
  previousInterviewExperience: previousInterviewExperienceSchema,
  targetRole: z.string().optional(),
});

/**
 * Inferred types
 */
export type InterviewType = z.infer<typeof interviewTypeSchema>;
export type CompanySize = z.infer<typeof companySizeSchema>;
export type RoleFocus = z.infer<typeof roleFocusSchema>;
export type ExperienceLevel = z.infer<typeof experienceLevelSchema>;
export type UserProfile = z.infer<typeof userProfileSchema>;
