import { makeCreatePetService } from "@/services/factories/make-create-pet-service";
import { FastifyReply } from "fastify";
import { FastifyRequest } from "fastify/types/request";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    orgId: z.string(),
    name: z.string(),
    description: z.string(),
    age: z.enum(["PUPPY", "ADULT"]),
    size: z.enum(["LITTLE", "MID", "BIG"]),
  });

  const { orgId, name, description, age, size } = createBodySchema.parse(
    request.body
  );

  const createPetSerice = makeCreatePetService();

  await createPetSerice.execute({
    orgId,
    name,
    description,
    age,
    size,
  });

  return reply.status(201).send();
}
