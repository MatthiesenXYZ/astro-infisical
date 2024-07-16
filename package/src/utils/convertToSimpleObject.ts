import type { SecretElement } from "@infisical/sdk";

export function convertToSimpleObject (secrets: SecretElement[]) {
    const virtualSecrets: Record<string, string> = {};

    for (const secret of secrets) {
        virtualSecrets[secret.secretKey] = secret.secretValue;
    }

    return virtualSecrets;
}