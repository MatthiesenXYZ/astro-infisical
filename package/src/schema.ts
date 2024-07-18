import { zodBoolean, zodObject, zodString, type zodInfer } from "./utils";


export const astroInfisicalOptionsSchema = zodObject({
		/**
		 * siteURL - Your self-hosted absolute site URL including the protocol (e.g. https://app.infisical.com)
		 *
		 * @default "https://app.infisical.com"
		 */
		siteUrl: zodString('https://app.infisical.com'),
		/**
		 * secretsPath - The path from where secrets should be fetched from.
		 *
		 * @default "/"
		 */
		secretsPath: zodString('/'),
		/**
		 * attachToProcessEnv - Attach secrets to the process.env object
		 *
		 * Whether or not to set the fetched secrets to the process environment. If true, you can access the secrets like so process.env["SECRET_NAME"].
		 *
		 * @default false
		 */
		attachToProcessEnv: zodBoolean(false),
		/**
		 * Enable verbose logging
		 */
		verbose: zodBoolean(false),
	});

export const optionsSchema = astroInfisicalOptionsSchema;

export type AstroInfisicalOptions = zodInfer<typeof astroInfisicalOptionsSchema>;
