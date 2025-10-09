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

### 3. Update `.mcp.json`

Replace the placeholder in `.mcp.json` with your actual token:

```json
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"],
      "env": {
        "NOTION_TOKEN": "ntn_YOUR_ACTUAL_TOKEN_HERE"
      }
    }
  }
}
```

### 4. Restart Claude Code

Completely quit and relaunch Claude Code for MCP servers to pick up the new configuration.

---

## Why This Approach?

### Technical Constraint

MCP servers **do not support** environment variable interpolation like `${VAR}`. Attempts to use:

```json
"NOTION_TOKEN": "${NOTION_INTEGRATION_TOKEN}"  // ❌ Doesn't work
```

Will fail because MCP passes the literal string to the server, not the variable value.

### Security Trade-off

**Current Approach** (Pragmatic):
- ✅ Token in `.env` for documentation
- ✅ Token in `.mcp.json` for functionality
- ✅ Both files in `.gitignore`
- ✅ Template file (`.mcp.json.example`) for sharing

**Why Not Just Environment Variables?**
- MCP servers need the actual token value at launch time
- They don't have access to shell environment variable interpolation
- This is a limitation of the MCP protocol, not our implementation

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
- [Project Troubleshooting Guide](./notion-mcp-troubleshooting.md)

---

**Last Updated**: January 9, 2025
