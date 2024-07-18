import { type ZodRawShape, type ZodTypeAny, type baseObjectInputType, z } from 'astro/zod';

/** Zod Object Maker */
const zodObject = <T extends ZodRawShape>(shape: T) =>
	z
		.object(shape)
		.optional()
		.default(() => ({}) as { [K in keyof baseObjectInputType<T>]: baseObjectInputType<T>[K] });

/** Zod String Maker */
const zodString = (def: string) => z.string().optional().default(def);

/** Zod Boolean Maker */
const zodBoolean = (def: boolean) => z.boolean().optional().default(def);

/** Zod Infer */
type zodInfer<T extends ZodTypeAny> = T['_output'];

export { zodObject, zodString, zodBoolean, type zodInfer };
