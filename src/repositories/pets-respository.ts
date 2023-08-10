import { Pet, Prisma } from "@prisma/client";

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  fetchManyPetsByIds(ids: string[]): Promise<Pet[]>;
}
