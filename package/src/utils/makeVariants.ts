import type { SecretElement } from '@infisical/sdk';
import { convertToSimpleObject } from './convertToSimpleObject';

/**
 * Make Variants
 *
 * This function takes an array of secret elements and returns a secrets object.
 */
export const makeVariants = (infisicalSecrets: SecretElement[]) => {
	return {
		count: infisicalSecrets.length,
		map: convertToSimpleObject(infisicalSecrets),
		object: Object.entries(convertToSimpleObject(infisicalSecrets)),
	};
};
