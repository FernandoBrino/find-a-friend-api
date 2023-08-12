import { PetsRepository } from "@/repositories/pets-respository";
import { Pet } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface SearchPetsServiceRequest {
  query: string;
}

interface SearchPetsServiceResponse {
  pets: Pet[];
}

export class SearchPetsService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    query,
  }: SearchPetsServiceRequest): Promise<SearchPetsServiceResponse> {
    const pets = await this.petsRepository.searchMany(query);

    return {
      pets,
    };
  }
}
