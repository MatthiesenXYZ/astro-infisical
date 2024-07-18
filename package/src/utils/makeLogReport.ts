import { strings } from '../strings';

/**
 * Create a log message for the secrets fetched from Infisical
 */
export const makeLogReport = (secrets: {
	count: number;
	map: Record<string, string>;
	object: [string, string][];
}) => {
	let logMessage = strings.createLogMessage(secrets.count);

	for (const [key, value] of secrets.object) {
		logMessage += strings.addSecretToMessage(key, value);
	}

	return logMessage;
};
