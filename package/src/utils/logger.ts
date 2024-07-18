import type { AstroIntegrationLogger } from 'astro';

/**
 * Logger Options
 */
export type LoggerOpts = {
	logger: AstroIntegrationLogger;
	verbose: boolean;
	type: 'info' | 'warn' | 'error' | 'debug';
};

/**
 * Logger Options Resolver Response
 */
export type LoggerOptsResolverResponse = {
	logInfo: LoggerOpts;
	logWarn: LoggerOpts;
	logError: LoggerOpts;
	logDebug: LoggerOpts;
};

/**
 * Logger Options Resolver
 * @param logger - The Astro logger
 * @param verbose - The verbose flag
 * @returns The logger options
 */
export const LoggerOptsResolver = async (
	logger: AstroIntegrationLogger,
	verbose: boolean
): Promise<LoggerOptsResolverResponse> => {
	const logInfo: LoggerOpts = { logger, verbose, type: 'info' };
	const logWarn: LoggerOpts = { logger, verbose, type: 'warn' };
	const logError: LoggerOpts = { logger, verbose, type: 'error' };
	const logDebug: LoggerOpts = { logger, verbose, type: 'debug' };

	return { logInfo, logWarn, logError, logDebug };
};

/**
 * Logger
 * @param opts - The logger options
 * @param message - The message to log
 */
export const Logger = async (opts: LoggerOpts, message: string) => {
	if (opts.verbose) {
		if (opts.type === 'info') {
			opts.logger.info(message);
		} else if (opts.type === 'warn') {
			opts.logger.warn(message);
		} else if (opts.type === 'error') {
			opts.logger.error(message);
		} else if (opts.type === 'debug') {
			opts.logger.debug(message);
		}
	}
	if (!opts.verbose) {
		if (opts.type === 'warn') {
			opts.logger.warn(message);
		} else if (opts.type === 'error') {
			opts.logger.error(message);
		} else if (opts.type === 'debug') {
			opts.logger.debug(message);
		}
	}
};
