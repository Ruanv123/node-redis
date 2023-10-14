import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import redis from "../lib/cache";

export const prisma = new PrismaClient();

class UserController {
  static async find(req: Request, res: Response) {
    try {
      const cacheKey = "users:all";

      const cachedUsers = await redis.get(cacheKey);

      if (cachedUsers) {
        return res.json(JSON.parse(cachedUsers));
      }

      console.time("Find Users");
      const user = await prisma.users.findMany();

      console.timeEnd("terminou de achar os users");
      await redis.set(cacheKey, JSON.stringify(user));
      return res.json(user);
    } catch (err) {
      console.log(err);
    } finally {
      await prisma.$disconnect();
    }
  }
}

export { UserController };
