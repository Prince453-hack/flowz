import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createWorkspacesSchema } from "../schemas";
import { sessionMiddleware } from "@/lib/session-middleware";

const app = new Hono().post(
  "/",
  zValidator("json", createWorkspacesSchema),
  sessionMiddleware,
  async (c) => {}
);

export default app;
