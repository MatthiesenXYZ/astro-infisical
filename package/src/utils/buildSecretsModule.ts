export const buildSecretsModule = (
    secrets: {
        count: number;
        map: Record<string, string>;
        object: [string, string][];
    }
) => {

    let buildSecretsModule = `export default ${JSON.stringify(secrets.map)};`;

    for (const [key, value] of secrets.object) {
        buildSecretsModule += `export const ${key} = ${JSON.stringify(value)};`;
    }

    return {
        'astro-infisical:env': buildSecretsModule
    };
}