import c from 'kleur';

export const strings = {
    setup: `Setting up ${c.bold().magenta("Infisical")}...`,
    mode: (mode: string) => `Running in mode: ${c.bold().yellow(mode)}`,
    connected: (siteUrl: string) => `${c.bold().green("Connected to Infisical")} - ${c.bold().blue(siteUrl)}`,
    createLogMessage: (count: number) => `${c.bold().green(`Fetched ${count} secrets from remote Infisical.`)}\n${c.bold("Available Secrets:")} ${c.italic().gray(`(Displayed as "${c.bold().yellow("Variable Name")}: ${c.bold().magenta("Type")}")`)}\n`,
    addSecretToMessage: (key: string, value: string) => `- ${c.bold().yellow(key)}: ${c.bold().magenta(typeof value)}\n`,
}

export default strings;