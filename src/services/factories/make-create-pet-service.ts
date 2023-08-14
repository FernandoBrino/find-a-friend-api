import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { CreatePetService } from "../create-pet";
import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";

export function makeCreatePetService() {
  const petsRepository = new PrismaPetsRepository();
  const orgsRepository = new PrismaOrgsRepository();
  const service = new CreatePetService(petsRepository, orgsRepository);

  return service;
}
