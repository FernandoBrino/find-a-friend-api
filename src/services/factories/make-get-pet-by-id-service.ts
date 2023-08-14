import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { GetPetById } from "../get-pet-by-id";

export function makeGetPetByIdService() {
  const petsRepository = new PrismaPetsRepository();
  const service = new GetPetById(petsRepository);

  return service;
}
