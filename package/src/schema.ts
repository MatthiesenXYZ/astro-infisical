import { z } from "astro/zod";

export const astroInfisicalOptionsSchema = z.object({
    /**
     * Enable verbose logging
     */
    verbose: z.boolean().optional().default(false)
}).optional().default({});

export const optionsSchema = astroInfisicalOptionsSchema;

export type AstroInfisicalOptions = z.infer<typeof astroInfisicalOptionsSchema>;