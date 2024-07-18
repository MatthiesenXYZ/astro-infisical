import { zodBoolean, type zodInfer, zodObject, zodString } from './utils';

/**
 * Astro Infisical Options Schema
 *
 * This schema is used to validate the options passed to the Infisical Astro plugin.
 */
export const astroInfisicalOptionsSchema = zodObject({
	/**
	 * Your Infisical self-hosted absolute site URL including the protocol (e.g. https://app.infisical.com)
	 *
	 * @default "https://app.infisical.com"
	 */
	siteUrl: zodString('https://app.infisical.com'),
	/**
	 * The Infisical path from where secrets should be fetched from.
	 *
	 * @default "/"
	 */
	secretsPath: zodString('/'),
	/**
	 * Attach secrets to the process.env object
	 *
	 * Whether or not to set the fetched secrets to the process environment. If true, you can access the secrets like so process.env["SECRET_NAME"].
	 *
	 * @default false
	 */
	attachToProcessEnv: zodBoolean(false),
	/**
	 * Enable verbose logging
	 *
	 * @default false
	 */
	verbose: zodBoolean(false),
	/**
	 * Automatically check for updates from the NPM registry
	 *
	 * @default true
	 */
	updateCheck: zodBoolean(true),
});

/**
 * Astro Infisical Options Schema
 *
 * This schema is used to validate the options passed to the Infisical Astro plugin.
 */
export const optionsSchema = astroInfisicalOptionsSchema;

/**
 * Astro Infisical Options
 *
 * This type is used to infer the options passed to the Infisical Astro plugin.
 */
export type AstroInfisicalOptions = zodInfer<typeof astroInfisicalOptionsSchema>;
