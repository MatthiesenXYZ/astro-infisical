import { defineConfig } from 'astro/config';
import astroInfisical from "@matthiesenxyz/astro-infisical";

// https://astro.build/config
export default defineConfig({
	site: 'http://localhost:4321',
	integrations: [ 
		astroInfisical({
			verbose: true,
		})
	], 
});
