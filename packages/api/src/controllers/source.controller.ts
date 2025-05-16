import { ResponseStatus, type Params, type SourceResponse } from '../common';
import type {
  CreateSourceInputType,
  GetAllSourcesInputType,
  GetSourceByIdInputType,
  GetSourceBySlugInputType,
} from '../schemas/source.schema';
import { ErrorCodes, ErrorMessages, errorResponse, handleError } from '../services';

// Domain identifier for error handling
const domain = 'SOURCE';

/**
 * Get a source by ID.
 *
 * @param ctx Ctx.
 * @param input GetSourceByIdInputType.
 * @returns Source.
 */
export const getSourceByIdHandler = async ({ ctx, input }: Params<GetSourceByIdInputType>): Promise<SourceResponse> => {
  const handlerId = 'getSourceByIdHandler';
  try {
    const { id } = input;
    const source = await ctx.prisma.source.findUnique({ where: { id } });

    if (!source) return errorResponse(domain, handlerId, ErrorCodes.Source.NoSource, ErrorMessages.Source.NoSource);

    return {
      result: {
        status: ResponseStatus.SUCCESS,
        source,
      },
    };
  } catch (error: unknown) {
    throw handleError(domain, handlerId, error);
  }
};

/**
 * Get source by slug.
 *
 * @param ctx Ctx.
 * @param input GetSourceBySlugInputType.
 * @returns Source.
 */
export const getSourceBySlugHandler = async ({
  ctx,
  input,
}: Params<GetSourceBySlugInputType>): Promise<SourceResponse> => {
  const handlerId = 'getSourceBySlugHandler';
  try {
    const { slug } = input;
    const source = await ctx.prisma.source.findUnique({ where: { slug } });

    // If the source does not exist, return an error
    if (!source) return errorResponse(domain, handlerId, ErrorCodes.Source.NoSource, ErrorMessages.Source.NoSource);

    return {
      result: {
        status: ResponseStatus.SUCCESS,
        source,
      },
    };
  } catch (error: unknown) {
    throw handleError(domain, handlerId, error);
  }
};

/**
 * Create a new source (mobalytics, op.gg, etc).
 *
 * @param ctx - Context with Prisma client.
 * @param input - CreateSourceInputType.
 * @returns Newly created source.
 */
export const createSourceHandler = async ({ ctx, input }: Params<CreateSourceInputType>): Promise<SourceResponse> => {
  const handlerId = 'createSourceHandler';
  try {
    // Check if the source already exists
    const existingSource = await ctx.prisma.source.findUnique({ where: { slug: input.slug } });
    if (existingSource) {
      return errorResponse(domain, handlerId, ErrorCodes.Source.AlreadyExists, ErrorMessages.Source.AlreadyExists);
    }

    // Create the source
    const source = await ctx.prisma.source.create({
      data: {
        ...input,
      },
    });

    if (!source) return errorResponse(domain, handlerId, ErrorCodes.Source.NotCreated, ErrorMessages.Source.NotCreated);

    return { result: { status: ResponseStatus.SUCCESS, source } };
  } catch (error: unknown) {
    throw handleError(domain, handlerId, error);
  }
};

/**
 * Get all sources (mobalytics, op.gg, etc).
 *
 * @param ctx Ctx.
 * @returns Array of sources.
 */
export const getAllSourcesHandler = async ({ ctx }: Params<GetAllSourcesInputType>) => {
  const handlerId = 'getAllSourcesHandler';
  try {
    const sources = await ctx.prisma.source.findMany({ where: { isActive: true } });
    return {
      result: {
        status: ResponseStatus.SUCCESS,
        sources,
      },
    };
  } catch (error: unknown) {
    throw handleError(domain, handlerId, error);
  }
};
