
export const astroMode = (command: "dev" | "build" | "preview") => {
    switch (command) {
        case "dev":
            return {
                console: "Development",
                mode: "dev",
            };
        case "build":
            return {
                console: "Production",
                mode: "prod",
            };
        case "preview":
            return {
                console: "Preview",
                mode: "preview",
            };
    }
}