import type { SecretElement } from '@infisical/sdk';

/**
 * Convert to Simple Object
 *
 * This function takes an array of secret elements and converts them to a simple object.
 */
export function convertToSimpleObject(secrets: SecretElement[]) {
	const virtualSecrets: Record<string, string> = {};

	for (const secret of secrets) {
		virtualSecrets[secret.secretKey] = secret.secretValue;
	}

	return virtualSecrets;
}
