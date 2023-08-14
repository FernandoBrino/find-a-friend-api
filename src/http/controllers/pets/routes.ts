import { FastifyInstance } from "fastify";
import { create } from "./create";
import { getById } from "./get-by-id";
import { search } from "./search";
import { fetchPetsByCity } from "./fetch-pets-by-city";

export async function petsRoutes(app: FastifyInstance) {
  app.post("/pets", create);
  app.get("/pets/:id", getById);
  app.get("/pets/search", search);
  app.get("/pets/city", fetchPetsByCity);
}
