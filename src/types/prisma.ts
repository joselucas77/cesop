export type Status =
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "REJECTED"
  | "APPROVED"
  | "CANCELLED";

export type AccessType = "READ_ONLY" | "DATA_ENTRY" | "READ_WRITE" | "ADMIN";

export type UserType = "CITIZEN" | "MANAGER" | "CENTRAL" | "CITYHALL";

export type Sex = "MASCULINO" | "FEMININO" | "OUTRO";
