import { defineIntegration } from "astro-integration-kit";
import { Logger, LoggerOptsResolver } from "./utils/logger";
import { optionsSchema } from "./schema";

export default defineIntegration({
    name: "@matthiesenxyz/astro-infisical",
    optionsSchema,
    setup({ options, name }) {
        return {
            hooks: {
                "astro:config:setup": async (params) => {

                    // Configure Logger
                    const { logInfo } = await LoggerOptsResolver(params.logger, options.verbose);
                
                    Logger(logInfo, `Setting up ${name}...`);
                }
            }
        }
    }
});