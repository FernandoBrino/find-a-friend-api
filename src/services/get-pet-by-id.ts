import { PetsRepository } from "@/repositories/pets-respository";
import { Pet } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetPetByIdRequest {
  id: string;
}

interface GetPetByIdResponse {
  pet: Pet;
}

export class GetPetById {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ id }: GetPetByIdRequest): Promise<GetPetByIdResponse> {
    const pet = await this.petsRepository.findById(id);

    if (!pet) {
      throw new ResourceNotFoundError();
    }

    return {
      pet,
    };
  }
}
