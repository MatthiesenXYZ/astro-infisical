# Astro-Infisical

[![NPM Version](https://img.shields.io/npm/v/@matthiesenxyz/astro-infisical)](https://npm.im/@matthiesenxyz/astro-infisical)

A simple integration for Infisical with Astro.
 
---
 
## Requirements:
 
This integration requires the following environment variables from your Infisical Service:
 
### '.env' File

```bash
# Infisical Project ID
INFISICAL_PROJECT_ID=infisical-project-id
# Infisical Universal Auth ClientID & ClientSecret
INFISICAL_CLIENT_ID=infisical-client-id
INFISICAL_CLIENT_SECRET=infisical-client-secret
```
 
---

## Basic Usage:
 
Configure the integration in your Astro config file.
 
```ts
import astroInfisical from "@matthiesenxyz/astro-infisical";
import defineConfig from "astro/config";
 
export default defineConfig({
   integrations: [
      astroInfisical({
         // Optional (For Self-Hosted Infisical) - Default shown
         siteUrl: "https://app.infisical.com", 
      }), 
      ...otherIntegrations
   ],
});
```
 
Then you can access your secrets like so:
 
```ts
// import all secrets as an object
import secrets from "astro-infisical:env"; 
// import a single secret
import { SECRET_NAME_SECOND } from "astro-infisical:env";

console.log("First Secret: " + secrets.SECRET_NAME_FIRST, ", Second Secret: " + SECRET_NAME_SECOND);
```
 
---
 
## Advanced Usage (Use ProcessENV for NodeJS)
 
Configure the integration in your Astro config file with processENV Injection

```ts
import astroInfisical from "@matthiesenxyz/astro-infisical";
import defineConfig from "astro/config";

export default defineConfig({
   integrations: [
      astroInfisical({
         // Optional (For Self-Hosted Infisical) - Default shown
         siteUrl: "https://app.infisical.com", 
         attachToProcessEnv: true,
      }), 
      ...otherIntegrations
   ],
});
```

Then you can access your secrets like so:

```ts
console.log("First Secret: " + process.env["SECRET_NAME_FIRST"], ", Second Secret: " + process.env["SECRET_NAME_SECOND"]);
```