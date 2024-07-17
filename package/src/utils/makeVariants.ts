import type { SecretElement } from '@infisical/sdk';
import { convertToSimpleObject } from './convertToSimpleObject';

export const makeVariants = (infisicalSecrets: SecretElement[]) => {
	return {
		count: infisicalSecrets.length,
		map: convertToSimpleObject(infisicalSecrets),
		object: Object.entries(convertToSimpleObject(infisicalSecrets)),
	};
};
