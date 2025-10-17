# MCP Server Configuration Guide

## Security Best Practices

This project uses Model Context Protocol (MCP) servers for integrations. Follow these steps to configure them securely.

---

## Setup Instructions

### 1. Copy the Template

Copy the example configuration to create your local MCP config:

```bash
cp .mcp.json.example .mcp.json
```

⚠️ **IMPORTANT**: `.mcp.json` is in `.gitignore` and will NOT be committed to version control.

### 2. Configure Environment Variables

All secrets should be stored in `.env` file (also gitignored):

```env
# Notion Integration Token (for MCP Server)
# Get your token from: https://www.notion.so/my-integrations
NOTION_INTEGRATION_TOKEN=ntn_YOUR_ACTUAL_TOKEN_HERE
```

### 3. Configure MCP with Token

Copy the template and add your token:

```bash
cp .mcp.json.example .mcp.json
```

Then edit `.mcp.json` and replace the placeholder:

```json
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"],
      "env": {
        "NOTION_TOKEN": "ntn_YOUR_ACTUAL_TOKEN_HERE"  // ← Replace with your token
      }
    }
  }
}
```

⚠️ **IMPORTANT**: `.mcp.json` is in `.gitignore` so your token stays local and secure!

### 4. Restart Claude Code

Completely quit (Cmd+Q) and relaunch Claude Code for MCP servers to reload with the new token.

---

## Why This Approach?

### Hardcoded Token with Gitignore (Recommended ✅)

**Current Approach** (Pragmatic & Secure):
- ✅ Token hardcoded in `.mcp.json` - works with any launch method
- ✅ `.mcp.json` in `.gitignore` - never committed to version control
- ✅ Template file (`.mcp.json.example`) for team sharing
- ✅ Works whether you launch from Dock, Finder, or terminal
- ✅ No complex shell configuration needed

**How It Works:**
1. Copy `.mcp.json.example` → `.mcp.json`
2. Add your actual token to `.mcp.json`
3. `.gitignore` prevents it from being committed
4. MCP server reads token directly from config

**Security:**
- Token file is gitignored (never tracked in version control)
- Each developer has their own local `.mcp.json`
- Template file has placeholder, not real tokens

### Why Not Shell Environment Variables?

**Shell approach issues:**
- ⚠️ Only works if Claude Code launched from terminal
- ⚠️ Doesn't work with GUI launch (Dock/Finder/Spotlight)
- ⚠️ macOS apps don't inherit shell profiles by default
- ⚠️ Extra complexity for little benefit

**Our approach is simpler:**
- ✅ Works regardless of launch method
- ✅ No shell profile configuration needed
- ✅ Gitignore provides sufficient security

### Why Not Variable Interpolation?

**Doesn't work:**
```json
"NOTION_TOKEN": "${NOTION_TOKEN}"  // ❌ Literal string passed
```

MCP configuration is JSON - no variable substitution happens. The token must be the actual value in the JSON file.

---

## Available MCP Servers

### Currently Configured

| Server | Purpose | Requires Auth |
|--------|---------|---------------|
| `memory` | Persistent context storage | No |
| `sequential-thinking` | Enhanced reasoning | No |
| `context7` | Documentation lookup | No |
| `playwright` | Browser automation | No |
| `browsermcp` | Alternative browser control | No |
| `shadcn` | UI component integration | No |
| `chrome-devtools` | Chrome DevTools integration | No |
| `notion` | Notion API integration | **Yes** ⚠️ |

### Adding More Servers

To add additional MCP servers with authentication:

1. Add credentials to `.env`:
   ```env
   GITHUB_TOKEN=your_github_token_here
   ```

2. Add server config to `.mcp.json`:
   ```json
   "github": {
     "command": "npx",
     "args": ["-y", "@modelcontextprotocol/server-github"],
     "env": {
       "GITHUB_TOKEN": "your_github_token_here"
     }
   }
   ```

3. Update `.mcp.json.example` with placeholder:
   ```json
   "github": {
     "command": "npx",
     "args": ["-y", "@modelcontextprotocol/server-github"],
     "env": {
       "GITHUB_TOKEN": "YOUR_GITHUB_TOKEN_HERE"
     }
   }
   ```

---

## Getting Notion Integration Token

1. Go to https://www.notion.so/my-integrations
2. Click **"+ New integration"**
3. Give it a name (e.g., "Claude Code MCP")
4. Select the workspace
5. Set capabilities:
   - ✅ Read content
   - ✅ Update content
   - ✅ Insert content
6. Click **"Submit"**
7. Copy the **"Internal Integration Token"** (starts with `ntn_`)
8. Add to your Notion pages:
   - Open the Notion page you want to access
   - Click "..." (more menu)
   - Select "Connections"
   - Add your integration

---

## Troubleshooting

### 401 Unauthorized Errors

**Symptoms**: MCP calls return `{"status":401,"object":"error","code":"unauthorized"}`

**Solutions**:
1. Verify token is correct in `.mcp.json`
2. Check token starts with `ntn_`
3. Ensure integration has access to the Notion pages
4. Restart Claude Code completely (Cmd+Q then relaunch)

### Variable Interpolation Not Working

**Symptoms**: Token appears as `"${VAR_NAME}"` instead of actual value

**Solution**: MCP doesn't support `${}` syntax. Use actual token value directly in `.mcp.json`.

---

## Security Checklist

Before committing code:

- [ ] `.mcp.json` is in `.gitignore`
- [ ] `.env` is in `.gitignore`
- [ ] `.mcp.json.example` contains NO real tokens
- [ ] All secrets are in `.env` file
- [ ] No tokens in commit history (`git log -p | grep "ntn_"`)

---

## For Team Members

### First-Time Setup

1. Clone the repository
2. Copy `.env.example` → `.env` (if exists)
3. Copy `.mcp.json.example` → `.mcp.json`
4. Get your Notion token from https://www.notion.so/my-integrations
5. Update both `.env` and `.mcp.json` with your token
6. Restart Claude Code

### Updating Configuration

If `.mcp.json.example` changes (new servers added):

```bash
# Backup your current config
cp .mcp.json .mcp.json.backup

# Get the latest template
git pull

# Manually merge changes from .mcp.json.example to .mcp.json
# Keep your existing tokens, add new server configs
```

---

## References

- [Notion MCP Server Documentation](https://github.com/makenotion/notion-mcp-server)
- [Model Context Protocol Specification](https://modelcontextprotocol.io/)
- [Notion API Documentation](https://developers.notion.com/)

---

**Last Updated**: January 9, 2025
