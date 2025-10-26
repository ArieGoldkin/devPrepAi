/**
 * Claude AI Configuration
 * Single source of truth for all AI-related settings
 *
 * This module centralizes all Claude AI configuration including:
 * - Model selection (with environment override capability)
 * - Token limits for different operations
 * - Temperature settings for different use cases
 */

// === Model Configuration ===
export const CLAUDE_MODEL = {
  // Recommended production model (Haiku 4.5 - cost-optimized)
  // $1/M input tokens, $5/M output tokens, 2x faster than Sonnet
  DEFAULT: "claude-haiku-4-5-20251001",
  // Version alias (auto-updates to latest patch, use with caution)
  ALIAS: "claude-haiku-4-5",
} as const;

// === Token Limits ===
// Maximum tokens to generate for different operations
export const MAX_TOKENS = {
  GENERATION: 4000, // Question generation (needs more tokens for multiple questions)
  EVALUATION: 1000, // Answer evaluation (moderate length feedback)
  HINTS: 500, // Progressive hints (concise, focused guidance)
} as const;

// === Temperature Settings ===
// Controls randomness/creativity (0-1, higher = more creative)
export const TEMPERATURE = {
  GENERATION: 0.7, // Creative question generation with variety
  EVALUATION: 0.7, // Balanced, fair feedback
  HINTS: 0.7, // Helpful but focused hints
} as const;

// === Configuration Interface ===
export interface IClaudeConfig {
  apiKey: string;
  model: string;
  maxTokens: typeof MAX_TOKENS;
  temperature: typeof TEMPERATURE;
  app: {
    name: string;
    version: string;
  };
}

/**
 * Get Claude AI configuration
 * Reads from environment with fallback to defaults
 *
 * Environment variables:
 * - ANTHROPIC_API_KEY (required): Your Anthropic API key
 * - NEXT_PUBLIC_ANTHROPIC_MODEL (optional): Override default model
 */
export function getClaudeConfig(): IClaudeConfig {
  const apiKey = process.env["ANTHROPIC_API_KEY"];
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY environment variable is required");
  }

  return {
    apiKey,
    // Allow environment override, but default to Haiku 4.5
    model: process.env["NEXT_PUBLIC_ANTHROPIC_MODEL"] || CLAUDE_MODEL.DEFAULT,
    maxTokens: MAX_TOKENS,
    temperature: TEMPERATURE,
    app: {
      name: "DevPrep AI",
      version: "2.0.0",
    },
  };
}

/**
 * Get sanitized config (without API key)
 * Safe for client-side usage or logging
 */
export function getSanitizedConfig(): Omit<IClaudeConfig, "apiKey"> {
  const config = getClaudeConfig();
  return {
    model: config.model,
    maxTokens: config.maxTokens,
    temperature: config.temperature,
    app: config.app,
  };
}
