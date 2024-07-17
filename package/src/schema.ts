import { z } from 'astro/zod';

export const astroInfisicalOptionsSchema = z
	.object({
		/**
		 * siteURL - Your self-hosted absolute site URL including the protocol (e.g. https://app.infisical.com)
		 *
		 * @default "https://app.infisical.com"
		 */
		siteUrl: z.string().optional().default('https://app.infisical.com'),
		/**
		 * secretsPath - The path from where secrets should be fetched from.
		 *
		 * @default "/"
		 */
		secretsPath: z.string().optional().default('/'),
		/**
		 * attachToProcessEnv - Attach secrets to the process.env object
		 *
		 * Whether or not to set the fetched secrets to the process environment. If true, you can access the secrets like so process.env["SECRET_NAME"].
		 *
		 * @default false
		 */
		attachToProcessEnv: z.boolean().optional().default(false),
		/**
		 * Enable verbose logging
		 */
		verbose: z.boolean().optional().default(false),
	})
	.optional()
	.default({});

export const optionsSchema = astroInfisicalOptionsSchema;

export type AstroInfisicalOptions = z.infer<typeof astroInfisicalOptionsSchema>;
