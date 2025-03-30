import { Response } from "@prisma/client";

export type ResponseWithStatus = Response & {
  status: string;
};
