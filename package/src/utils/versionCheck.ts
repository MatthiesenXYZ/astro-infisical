import * as http from 'node:http';
import { defineUtility } from 'astro-integration-kit';
import * as semver from 'semver';

/**
 * Fetch the latest version of a package from the npm registry
 * @param name - The name of the package to fetch the latest version for
 * @returns The latest version of the package
 */
function fetchLatestVersion(name: string): Promise<string> {
	return new Promise((resolve, reject) => {
		const url = `http://registry.npmjs.org/${name}/latest`;

		const request = http.get(url, (response) => {
			let data = '';

			response.on('data', (chunk) => {
				data += chunk;
			});

			response.on('end', () => {
				try {
					const latestVersion = JSON.parse(data).version;
					resolve(latestVersion);
				} catch (error) {
					reject(error);
				}
			});
		});

		request.on('error', (error) => {
			reject(error);
		});

		request.end();
	});
}

/**
 * Check for updates to the package ( AIK Utility )
 * @param params - The Astro parameters
 * @param opts - The options
 */
export const npmUpdateCheck = defineUtility('astro:config:setup')(
	async (
		params,
		opts: {
			name: string;
			currentVersion: string;
		}
	) => {
		if (params.command === 'dev') {
			const logger = params.logger.fork(`${opts.name} (UPDATE CHECK)`);

			try {
				const latestVersion = await fetchLatestVersion(opts.name);

				const comparison = semver.compare(opts.currentVersion, latestVersion);

				if (comparison === -1) {
					logger.warn(
						`A new version of ${opts.name} is available. Please update to ${latestVersion} using your favorite package manager.`
					);
				} else if (comparison === 0) {
					logger.debug(`You are using the latest version of ${opts.name}`);
				} else {
					logger.debug(`You are using a newer version of ${opts.name} than the latest release`);
				}
			} catch (error) {
				if (error instanceof Error) {
					logger.error(`Error fetching latest version from npm registry: ${error.message}`);
				} else {
					// Handle the case where error is not an Error object
					logger.error(
						'An unknown error occurred while fetching the latest version from the npm registry.'
					);
				}
			}
		}
	}
);
