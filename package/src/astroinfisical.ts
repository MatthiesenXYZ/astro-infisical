import { addDts, addVirtualImports, defineIntegration } from "astro-integration-kit";
import { Logger, LoggerOptsResolver, astroMode, infisicalClient, checkEnv, makeVariants, secretsDTS, buildSecretsModule, makeLogReport } from './utils';
import { optionsSchema } from "./schema";
import { loadEnv } from "vite";
import { strings } from "./strings";
import { name, envPrefix } from './consts';
import { AstroError } from "astro/errors";

export default defineIntegration({
    name, optionsSchema,
    setup({ options: { siteUrl, secretsPath: path, attachToProcessEnv: processEnv, verbose }, name }) {
        return {
            hooks: {
                "astro:config:setup": async (params) => {
                    // Configure Logger
                    const loggerOpts = await LoggerOptsResolver(params.logger, verbose);
                
                    // Log Start of Setup
                    Logger(loggerOpts.logInfo, strings.setup);

                    // Get Current mode
                    const { mode: environment, console: consoleMode } = astroMode(params.command);

                    // Log Mode
                    Logger(loggerOpts.logInfo, strings.mode(consoleMode));

                    // load variables
                    const viteEnv = loadEnv('all', process.cwd(), envPrefix);

                    // Check Environment Variables and get the ones we need
                    const { CLIENT_ID: clientId, CLIENT_SECRET: clientSecret, PROJECT_ID: projectId } = checkEnv(viteEnv, Logger, loggerOpts);

                    // Setup Infisical Client
                    const infisicalAPI = infisicalClient({ siteUrl, clientId, clientSecret });

                    // Fetch Secrets
                    const infisicalSecrets = await infisicalAPI
                        .getSecrets({ environment, projectId, path, processEnv })
                        .catch((err) => {
                            if (err instanceof Error) {
                                Logger(loggerOpts.logError, err.message);
                                throw new AstroError(err.message);
                            }

                            Logger(loggerOpts.logError, err);
                            throw new AstroError(err);
                        });

                    // Log Connection
                    Logger(loggerOpts.logInfo, strings.connected(siteUrl));

                    // Create Variants
                    const secrets = makeVariants(infisicalSecrets);

                    // Log Secrets
                    Logger(loggerOpts.logInfo, makeLogReport(secrets));

                    // Add DTS File
                    addDts(params, { name, content: secretsDTS(secrets) });

                    // Add Virtual Imports
                    addVirtualImports(params, { name, imports: buildSecretsModule(secrets) });
                }
            }
        }
    }
});