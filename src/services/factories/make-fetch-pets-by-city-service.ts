import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { FetchPetsByCity } from "../fetch-pets-by-city";

export function makeFetchPetsByCityService() {
  const petsRepository = new PrismaPetsRepository();
  const orgsRepository = new PrismaOrgsRepository();
  const service = new FetchPetsByCity(petsRepository, orgsRepository);

  return service;
}
