import { Pet, Prisma } from "@prisma/client";

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  findById(id: string): Promise<Pet | null>;
  fetchManyPetsByIds(ids: string[]): Promise<Pet[]>;
  searchMany(query: string): Promise<Pet[]>;
}
