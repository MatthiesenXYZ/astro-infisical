import { fileFactory } from './fileFactory';

/**
 * Generate a TypeScript declaration file for the secrets object
 * @param secrets - The secrets object
 * @returns The TypeScript declaration file
 */
export const secretsDTS = (secrets: {
	count: number;
	map: Record<string, string>;
	object: [string, string][];
}) => {
	const DTSFile = fileFactory();

	// MAIN MODULE
	DTSFile.addLines(`declare module "astro-infisical:env" {`);

	// SECRETS OBJECT
	DTSFile.addLines('/** Infisical Remote ENV Secrets List */\nexport const secrets: {');

	for (const [key, value] of secrets.object) {
		DTSFile.addLines(
			`    /** Infisical Remote ENV Variable - ${key} */\n    ${key}: ${typeof value};`
		);
	}

	DTSFile.addLines('};');

	// DEFAULT EXPORT
	DTSFile.addLines('export default secrets;');

	// INDIVIDUAL EXPORTS
	for (const [key, value] of secrets.object) {
		DTSFile.addLines(
			`/** Infisical Remote ENV Variable - ${key} */\nexport const ${key}: ${typeof value};`
		);
	}

	// END MODULE
	DTSFile.addLines('}');

	return DTSFile.text();
};
