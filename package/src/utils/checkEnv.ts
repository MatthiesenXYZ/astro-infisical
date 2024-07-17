import { AstroError } from 'astro/errors';
import type { LoggerOpts, LoggerOptsResolverResponse } from './logger';

export function checkEnv(
	viteEnv: Record<string, string>,
	Logger: (opts: LoggerOpts, message: string) => Promise<void>,
	loggerOpts: LoggerOptsResolverResponse
) {
	if (!viteEnv.INFISICAL_CLIENT_ID) {
		Logger(loggerOpts.logError, 'INFISICAL_CLIENT_ID is not set. Please set it in your .env file.');
		throw new AstroError('INFISICAL_CLIENT_ID is not set. Please set it in your .env file.');
	}
	if (!viteEnv.INFISICAL_CLIENT_SECRET) {
		Logger(
			loggerOpts.logError,
			'INFISICAL_CLIENT_SECRET is not set. Please set it in your .env file.'
		);
		throw new AstroError('INFISICAL_CLIENT_SECRET is not set. Please set it in your .env file.');
	}
	if (!viteEnv.INFISICAL_PROJECT_ID) {
		Logger(
			loggerOpts.logError,
			'INFISICAL_PROJECT_ID is not set. Please set it in your .env file.'
		);
		throw new AstroError('INFISICAL_PROJECT_ID is not set. Please set it in your .env file.');
	}

	return {
		CLIENT_ID: viteEnv.INFISICAL_CLIENT_ID,
		CLIENT_SECRET: viteEnv.INFISICAL_CLIENT_SECRET,
		PROJECT_ID: viteEnv.INFISICAL_PROJECT_ID,
	};
}
