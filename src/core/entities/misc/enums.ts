export enum UserRole {
  ADMIN = "admin",
  TUTOR = "tutor",
  USER = "user",
}

export type roles = UserRole.ADMIN | UserRole.TUTOR | UserRole.USER;