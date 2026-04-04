import {Role} from "../generated/prisma/enums";

declare global {
    namespace Express {
      interface Request {
        user?: { userId: string; role: Role }
        pagination?: { page: number; limit: number; skip: number }
      }
    }
  }

export {}