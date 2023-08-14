import { $Enums, Pet, Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-respository";
import { prisma } from "@/lib/prisma";

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    });

    return pet;
  }

  async fetchManyPetsByIds(ids: string[]) {
    const pets = await prisma.pet.findMany({
      where: {
        org_id: { in: ids },
      },
    });

    return pets;
  }

  async searchMany(query: any) {
    const pets = await prisma.pet.findMany({
      include: query,
    });

    return pets;
  }
}
