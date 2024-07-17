import { fileFactory } from './fileFactory';

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
