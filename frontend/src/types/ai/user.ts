/**
 * User Types
 * Types related to user profiles and preferences
 */

// Interview type options
export type InterviewType = "coding" | "system-design" | "behavioral";

// Company size preference
export type CompanySize = "startup" | "mid-size" | "enterprise" | "any";

// Role focus areas
export type RoleFocus =
  | "frontend"
  | "backend"
  | "fullstack"
  | "devops"
  | "mobile";

// User profile for interview preparation
export interface IUserProfile {
  experienceLevel: "junior" | "mid" | "senior";
  yearsOfExperience: number;
  technologies: string[];
  roleFocus: RoleFocus;
  interviewType: InterviewType;
  companySizePreference: CompanySize;
  previousInterviewExperience: "none" | "some" | "extensive";
  targetRole?: string; // Optional field for specific role targeting
}
