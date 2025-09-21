#!/bin/bash
# Simple setup script to link environment variables

# Create symlink from frontend to root .env file
echo "Setting up environment variables..."
ln -sf ../.env frontend/.env
echo "✓ Linked frontend/.env to root .env file"

# The frontend will now use environment variables from the root .env file:
# - ANTHROPIC_API_KEY (for server-side API routes)
# - Other shared configurations

echo "✓ Setup complete"