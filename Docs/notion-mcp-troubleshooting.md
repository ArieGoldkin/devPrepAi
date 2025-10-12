# Notion MCP Integration - Troubleshooting Guide

## Issue Summary

**Problem**: Notion MCP tools returned `401 unauthorized` errors while direct curl commands worked.

**Root Cause**: Incorrect environment variable configuration in `.mcp.json`

---

## What Was Wrong

### Original Configuration (Broken)
```json
{
  "notion": {
    "command": "npx",
    "args": ["-y", "@notionhq/notion-mcp-server"],
    "env": {
      "NOTION_API_KEY": "${NOTION_MCP_API_KEY}"  // ❌ WRONG
    }
  }
}
```

**Two Problems:**
1. **Wrong Environment Variable Name**: Used `NOTION_API_KEY` instead of `NOTION_TOKEN`
2. **Variable Interpolation Doesn't Work**: MCP servers don't perform shell-style `${VAR}` interpolation

### Fixed Configuration (Working)
```json
{
  "notion": {
    "command": "npx",
    "args": ["-y", "@notionhq/notion-mcp-server"],
    "env": {
      "NOTION_TOKEN": "ntn_YOUR_NOTION_INTEGRATION_TOKEN_HERE"  // ✅ Replace with your token
    }
  }
}
```

---

## Why Curl Worked But MCP Didn't

**Curl Command** (Direct API call):
```bash
curl -H "Authorization: Bearer ntn_..." https://api.notion.com/v1/users/me
```
✅ Works because the token is passed directly in the Authorization header

**MCP Server** (Before fix):
- MCP server looked for env var `NOTION_API_KEY`
- Found literal string `"${NOTION_MCP_API_KEY}"` (not the actual token)
- Tried to use this invalid string as the token → 401 error

---

## Official Notion MCP Configuration Options

According to the [official documentation](https://github.com/makenotion/notion-mcp-server):

### Option 1: NOTION_TOKEN (Recommended)
```json
{
  "mcpServers": {
    "notionApi": {
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"],
      "env": {
        "NOTION_TOKEN": "ntn_****"
      }
    }
  }
}
```

### Option 2: OPENAPI_MCP_HEADERS (Advanced)
```json
{
  "mcpServers": {
    "notionApi": {
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"],
      "env": {
        "OPENAPI_MCP_HEADERS": "{\"Authorization\": \"Bearer ntn_****\", \"Notion-Version\": \"2022-06-28\"}"
      }
    }
  }
}
```

---

## Security Consideration

⚠️ **Trade-off**: Hardcoding the token in `.mcp.json` works but is less secure than using environment variables.

**Best Practice for Production:**
1. Add `.mcp.json` to `.gitignore` (if not already)
2. Create a `.mcp.json.example` template without the actual token
3. Document the setup process for team members

**Alternative (More Secure):**
If Claude Code supports environment variable interpolation in future versions, use:
```json
{
  "env": {
    "NOTION_TOKEN": "${NOTION_MCP_API_KEY}"
  }
}
```

---

## Verification Steps

After fixing `.mcp.json`:

1. **Restart Claude Code** completely (Cmd+Q, then relaunch)
2. **Test MCP Connection**:
   ```
   mcp__notion__API-get-self
   ```
   Should return: `{"object":"user","id":"...","name":"AI Assistant",...}`

3. **Query Database**:
   ```
   mcp__notion__API-post-database-query
   ```
   Should return tasks without 401 errors

---

## Known Issues & Bugs

**GitHub Issue #109**: "Critical Bug: MCP Server Not Passing Authorization Header to Notion API"
- **Status**: Resolved in v1.9.0
- **Workaround**: Use `NOTION_TOKEN` or `OPENAPI_MCP_HEADERS` as shown above

**GitHub Issue #106**: "401 using mcp.notion.com/mcp"
- Related to authentication header configuration

---

## Cleanup

The `NOTION_MCP_API_KEY` environment variable in `~/.zshrc` is **no longer needed** since the token is now directly in `.mcp.json`.

**Optional Cleanup**:
```bash
# Remove from ~/.zshrc
# export NOTION_MCP_API_KEY=ntn_YOUR_TOKEN_HERE
```

---

## References

- [Notion MCP Server GitHub](https://github.com/makenotion/notion-mcp-server)
- [Notion MCP Documentation](https://developers.notion.com/docs/mcp)
- [Issue #109 - Authorization Header Bug](https://github.com/makenotion/notion-mcp-server/issues/109)
- [Model Context Protocol Specification](https://modelcontextprotocol.io/)

---

**Last Updated**: January 9, 2025
**Status**: ✅ RESOLVED
