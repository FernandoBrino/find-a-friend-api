import { makeSearchPetsService } from "@/services/factories/make-search-pets-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchPetQuerySchema = z.object({
    q: z.string(),
  });

  const { q } = searchPetQuerySchema.parse(request.query);

  const searchPetsService = makeSearchPetsService();

  const { pets } = await searchPetsService.execute({
    query: q,
  });

  return reply.status(200).send({ pets });
}
