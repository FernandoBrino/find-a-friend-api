import { OrgsRepository } from "@/repositories/orgs-repository";
import { PetsRepository } from "@/repositories/pets-respository";
import { Pet } from "@prisma/client";

interface FetchPetsByCityServiceRequest {
  city: string;
}

interface FetchPetsByCityServiceResponse {
  pets: Pet[];
}

export class FetchPetsByCity {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository
  ) {}

  async execute({
    city,
  }: FetchPetsByCityServiceRequest): Promise<FetchPetsByCityServiceResponse> {
    const orgsAtCity = await this.orgsRepository.findManyByCity(city);

    const orgsIds = orgsAtCity.map((org) => org.id);

    const petsAtCity = await this.petsRepository.fetchManyPetsByIds(orgsIds);

    return {
      pets: petsAtCity,
    };
  }
}
