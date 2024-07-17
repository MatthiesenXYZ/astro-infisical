import astroIntegration from "./astroinfisical";
import type { AstroInfisicalOptions } from "./schema";

/**
 * ## Astro-Infisical
 * 
 * A simple integration for Infisical with Astro.
 * 
 * ### Usage
 * 
 * #### Basic Usage
 * 
 * Configure the integration in your Astro config file.
 * 
 * ```ts
 * import astroInfisical from "astro-infisical";
 * import defineConfig from "astro/config";
 * 
 * export default defineConfig({
 *    integrations: [
 *       astroInfisical({
 *          siteUrl: "https://app.infisical.com", // Optional (For Self-Hosted Infisical) - Default shown
 *       }), 
 *       ...otherIntegrations
 *    ],
 * });
 * ```
 * 
 * Then you can access your secrets like so:
 * 
 * ```ts
 * import secrets from "astro-infisical:env"; // import all secrets as an object
 * import { SECRET_NAME_SECOND } from "astro-infisical:env"; // import a single secret
 * 
 * console.log("First Secret: " + secrets.SECRET_NAME_FIRST, ", Second Secret: " + SECRET_NAME_SECOND);
 * ```
 * 
 * #### Advanced Usage (Use ProcessENV for NodeJS)
 * 
 * Configure the integration in your Astro config file with processENV Injection
 * 
 * ```ts
 * import astroInfisical from "astro-infisical";
 * import defineConfig from "astro/config";
 * 
 * export default defineConfig({
 *    integrations: [
 *       astroInfisical({
 *          siteUrl: "https://app.infisical.com", // Optional (For Self-Hosted Infisical) - Default shown
 *          attachToProcessEnv: true,
 *       }), 
 *       ...otherIntegrations
 *    ],
 * });
 * ```
 * 
 * Then you can access your secrets like so:
 * 
 * ```ts
 * console.log("First Secret: " + process.env["SECRET_NAME_FIRST"], ", Second Secret: " + process.env["SECRET_NAME_SECOND"]);
 * ```
 */
export const astroInfisical = astroIntegration;

export default astroInfisical;
export type { AstroInfisicalOptions };