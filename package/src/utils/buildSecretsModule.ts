// Types for addVirtualImports
type VirtualImport = {
    id: string;
    content: string;
    context?: "server" | "client" | undefined;
};
type Imports = Record<string, string> | Array<VirtualImport>;

export const buildSecretsModule = (secrets: {
	count: number;
	map: Record<string, string>;
	object: [string, string][];
}): Imports => {
	let buildSecretsModule = `export default ${JSON.stringify(secrets.map)};`;

	for (const [key, value] of secrets.object) {
		buildSecretsModule += `export const ${key} = ${JSON.stringify(value)};`;
	}

	return {
		'astro-infisical:env': buildSecretsModule,
	};
};
