import astroInfisical from '@matthiesenxyz/astro-infisical';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'http://localhost:4321',
	integrations: [
		astroInfisical({
			siteUrl: 'https://infisical.matthiesen.dev',
			verbose: true,
			attachToProcessEnv: true,
		}),
	],
});
