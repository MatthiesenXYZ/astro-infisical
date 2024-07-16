import { addDts, addVirtualImports, defineIntegration } from "astro-integration-kit";
import { Logger, LoggerOptsResolver } from "./utils/logger";
import { optionsSchema } from "./schema";
import { loadEnv } from "vite";
import { astroMode } from "./utils/astroMode";
import { infisicalClient } from "./utils/client";
import { checkEnv } from "./utils/checkEnv";
import { makeVariants } from "./utils/makeVariants";
import { secretsDTS } from "./utils/secretsDTS";
import strings from "./strings";
import { buildSecretsModule } from "./utils/buildSecretsModule";
import { makeLogReport } from "./utils/makeLogReport";

export default defineIntegration({
    name: "@matthiesenxyz/astro-infisical",
    optionsSchema,
    setup({ options, name }) {
        // load variables
        const viteEnv = loadEnv('all', process.cwd(), 'INFISICAL_');

        return {
            hooks: {
                "astro:config:setup": async (params) => {

                    // Configure Logger
                    const loggerOpts = await LoggerOptsResolver(params.logger, options.verbose);
                
                    // Log Start of Setup
                    Logger(loggerOpts.logInfo, strings.setup);

                    // Get Current mode
                    const { mode, console: consoleMode } = astroMode(params.command);

                    // Log Mode
                    Logger(loggerOpts.logInfo, strings.mode(consoleMode));

                    // Check Environment Variables
                    const { CLIENT_ID, CLIENT_SECRET, PROJECT_ID } = checkEnv(viteEnv, Logger, loggerOpts);

                    // Setup Infisical Client & Get Secrets
                    const infisicalAPI = infisicalClient({
                        siteUrl: options.siteUrl,
                        clientId: CLIENT_ID,
                        clientSecret: CLIENT_SECRET,
                    });
                    const infisicalSecrets = await infisicalAPI.getSecrets({
                        environment: mode,
                        projectId: PROJECT_ID,
                        path: options.secretsPath,
                        processEnv: options.attachToProcessEnv,
                    });

                    Logger(loggerOpts.logInfo, strings.connected(options.siteUrl));

                    // Create Variants
                    const secrets = makeVariants(infisicalSecrets);

                    // Log Secrets
                    Logger(loggerOpts.logInfo, makeLogReport(secrets));

                    // Add DTS File
                    addDts(params, { name, content: secretsDTS(secrets.object) });

                    // Add Virtual Imports
                    addVirtualImports(params, { name, imports: buildSecretsModule(secrets) });
                }
            }
        }
    }
});