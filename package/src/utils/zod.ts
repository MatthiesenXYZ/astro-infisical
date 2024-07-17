import { z, type ZodRawShape, type ZodType } from 'astro/zod';

const zodObject = (shape: ZodRawShape) => z.object(shape).optional().default({});
const zodString = (def: string) => z.string().optional().default(def);
const zodBoolean = (def: boolean) => z.boolean().optional().default(def);
// biome-ignore lint/suspicious/noExplicitAny: This is copied from z.infer
type zodInfer<T extends ZodType<any, any, any>> = T['_output'];

export { zodObject, zodString, zodBoolean, type zodInfer};