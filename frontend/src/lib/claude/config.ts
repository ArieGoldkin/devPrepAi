/**
 * DevPrep AI - Application Configuration
 * Basic config for interview prep platform
 */

export interface IAppConfig {
  anthropic: {
    apiKey: string;
    model: string;
  };
  app: {
    name: string;
    version: string;
  };
}

export function getConfig(): IAppConfig {
  const apiKey = process.env["ANTHROPIC_API_KEY"];
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is required");
  }

  return {
    anthropic: {
      apiKey,
      model:
        process.env["NEXT_PUBLIC_ANTHROPIC_MODEL"] ||
        "claude-3-5-sonnet-latest",
    },
    app: {
      name: "DevPrep AI",
      version: "1.0.0",
    },
  };
}

export function getSanitizedConfig(): Omit<IAppConfig, "anthropic"> & {
  anthropic: Omit<IAppConfig["anthropic"], "apiKey">;
} {
  const config = getConfig();
  return {
    anthropic: {
      model: config.anthropic.model,
    },
    app: config.app,
  };
}
