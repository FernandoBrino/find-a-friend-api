import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeGetPetByIdService } from "@/services/factories/make-get-pet-by-id-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getById(request: FastifyRequest, reply: FastifyReply) {
  const getPetRouteSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = getPetRouteSchema.parse(request.params);

  const getPetByIdService = makeGetPetByIdService();

  try {
    const { pet } = await getPetByIdService.execute({ id });

    return reply.status(200).send({
      pet,
    });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send();
    }

    throw error;
  }
}
