export enum UserRole {
  ADMIN = "admin",
  TUTOR = "tutor",
  USER = "user",
}

export type roles = UserRole.ADMIN | UserRole.TUTOR | UserRole.USER;

export enum CourseLevels {
  BEGINNER = "Beginner",
  INTERMEDIATE = "Intermediate",
  ADVANCED = "Advanced",
}

export type levels =
  | CourseLevels.BEGINNER
  | CourseLevels.INTERMEDIATE
  | CourseLevels.ADVANCED;
