import { OrgsRepository } from "@/repositories/orgs-repository";
import { PetsRepository } from "@/repositories/pets-respository";
import { $Enums, Pet } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface CreatePetServiceRequest {
  orgId: string;
  name: string;
  description: string | null;
  age: $Enums.PetAge;
  size: $Enums.PetSize;
}

interface CreatePetServiceResponse {
  pet: Pet;
}

export class CreatePetService {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository
  ) {}

  async execute({
    orgId,
    name,
    description,
    age,
    size,
  }: CreatePetServiceRequest): Promise<CreatePetServiceResponse> {
    const org = await this.orgsRepository.findById(orgId);

    if (!org) {
      throw new ResourceNotFoundError();
    }

    const pet = await this.petsRepository.create({
      org_id: orgId,
      name,
      description,
      age,
      size,
    });

    return {
      pet,
    };
  }
}
