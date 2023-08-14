import { makeFetchPetsByCityService } from "@/services/factories/make-fetch-pets-by-city-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function fetchPetsByCity(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const fetchPetsQuerySchema = z.object({
    q: z.string(),
  });

  const { q } = fetchPetsQuerySchema.parse(request.query);

  const fetchPetsByCityService = makeFetchPetsByCityService();

  const { pets } = await fetchPetsByCityService.execute({
    city: q,
  });

  return reply.status(200).send({ pets });
}
