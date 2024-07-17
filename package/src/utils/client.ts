import { InfisicalClient } from '@infisical/sdk';

export const infisicalClient = (clientOpts: {
	siteUrl: string;
	clientId: string;
	clientSecret: string;
}) => {
	return {
		makeClient: () =>
			new InfisicalClient({
				siteUrl: clientOpts.siteUrl,
				auth: {
					universalAuth: {
						clientId: clientOpts.clientId,
						clientSecret: clientOpts.clientSecret,
					},
				},
			}),
		getSecrets: async (secretOpts: {
			environment: string;
			projectId: string;
			path: string;
			processEnv: boolean;
		}) => {
			const client = infisicalClient({
				siteUrl: clientOpts.siteUrl,
				clientId: clientOpts.clientId,
				clientSecret: clientOpts.clientSecret,
			}).makeClient();
			const secrets = await client.listSecrets({
				environment: secretOpts.environment,
				projectId: secretOpts.projectId,
				path: secretOpts.path,
				attachToProcessEnv: secretOpts.processEnv,
				includeImports: false,
			});
			return secrets;
		},
	};
};
