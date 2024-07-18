/**
 * Virtual Import Type from AIK addVirtualImports Utility
 */
type VirtualImport = {
	id: string;
	content: string;
	context?: 'server' | 'client' | undefined;
};

/**
 * Imports Type from AIK addVirtualImports Utility
 */
type Imports = Record<string, string> | Array<VirtualImport>;

type Secrets = {
	count: number;
	map: Record<string, string>;
	object: [string, string][];
};

/**
 * Build Secrets Module
 *
 * This function takes the secrets object and builds a module for usage as a Vite virtual import.
 */
export const buildSecretsModule = (secrets: Secrets): Imports => {
	let buildSecretsModule = `export default ${JSON.stringify(secrets.map)};`;

	for (const [key, value] of secrets.object) {
		buildSecretsModule += `export const ${key} = ${JSON.stringify(value)};`;
	}

	return {
		'astro-infisical:env': buildSecretsModule,
	};
};
