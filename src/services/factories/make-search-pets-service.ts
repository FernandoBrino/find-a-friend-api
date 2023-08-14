import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { SearchPetsService } from "../search-pets";

export function makeGetPetByIdService() {
  const petsRepository = new PrismaPetsRepository();
  const service = new SearchPetsService(petsRepository);

  return service;
}
