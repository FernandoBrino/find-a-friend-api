import { FastifyInstance } from "fastify";
import { create } from "./create";
import { getById } from "./get-by-id";

export async function petsRoutes(app: FastifyInstance) {
  app.post("/pets", create);
  app.get("/pets/:id", getById);
}
