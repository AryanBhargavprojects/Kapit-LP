#!/usr/bin/env bash
set -euo pipefail

# Kapit API Client Skill Installer
#
# Installs the kapit-api-client skill for AI coding agents (Claude Code, Codex,
# Cursor, Windsurf, Cline, Kilo Code, etc.).
#
# Usage:
#   curl -fsSL https://kapit.dev/skills/install.sh | bash
#
# Or locally:
#   bash install.sh
#
# The skill is installed to ${KAPIT_SKILLS_DIR:-$HOME/.claude/skills}/kapit-api-client
#
# After installation, your AI agent will know how to:
#   - Get a Kapit API key
#   - Call V1 endpoints (stocks, crypto, Polymarket)
#   - Parse response envelopes and metadata
#   - Handle errors with structured recovery
#   - Respect rate limits and tiers

SKILL_NAME="kapit-api-client"
BASE_URL="https://kapit.dev/skills/${SKILL_NAME}"
DEFAULT_DIR="${HOME}/.claude/skills"
INSTALL_DIR="${KAPIT_SKILLS_DIR:-${DEFAULT_DIR}}/${SKILL_NAME}"

echo ""
echo "╔══════════════════════════════════════════════════╗"
echo "║   Kapit API Client Skill Installer               ║"
echo "╚══════════════════════════════════════════════════╝"
echo ""
echo "Skill:     ${SKILL_NAME}"
echo "Install:   ${INSTALL_DIR}"
echo "Source:    ${BASE_URL}/"
echo ""

# Create install directory
mkdir -p "${INSTALL_DIR}"

# Files to download (relative paths)
FILES=(
  "SKILL.md"
  "references/endpoints.md"
  "references/auth-and-billing.md"
  "references/error-recovery.md"
  "references/examples.md"
  "scripts/kapit_request.py"
)

echo "Downloading skill files..."
for file in "${FILES[@]}"; do
  dir=$(dirname "${file}")
  if [ "${dir}" != "." ]; then
    mkdir -p "${INSTALL_DIR}/${dir}"
  fi
  
  url="${BASE_URL}/${file}"
  dest="${INSTALL_DIR}/${file}"
  
  if command -v curl &>/dev/null; then
    curl -fsSL "${url}" -o "${dest}" || {
      echo "  ✗ Failed: ${file}"
      echo "    Is https://kapit.dev reachable? Try again later."
      rm -rf "${INSTALL_DIR}"
      exit 1
    }
  elif command -v wget &>/dev/null; then
    wget -q "${url}" -O "${dest}" || {
      echo "  ✗ Failed: ${file}"
      rm -rf "${INSTALL_DIR}"
      exit 1
    }
  else
    echo "  ✗ Neither curl nor wget found. Install one and retry."
    rm -rf "${INSTALL_DIR}"
    exit 1
  fi
  echo "  ✓ ${file}"
done

# Make scripts executable
chmod +x "${INSTALL_DIR}/scripts/kapit_request.py" 2>/dev/null || true

echo ""
echo "╔══════════════════════════════════════════════════╗"
echo "║ ✓ Skill installed to:                            ║"
echo "║   ${INSTALL_DIR}"
echo "║                                                  ║"
echo "║ Next steps:                                      ║"
echo "║   1. Get an API key at:                          ║"
echo "║      https://kapit.dev/dashboard                  ║"
echo "║                                                  ║"
echo "║   2. Set your key:                               ║"
echo "║      export KAPIT_API_KEY=kap_live_...           ║"
echo "║                                                  ║"
echo "║   3. Try it:                                     ║"
echo "║      python3 ${INSTALL_DIR}/scripts/kapit_request.py stocks AAPL"
echo "║                                                  ║"
echo "║   4. Your AI agent now has the skill.            ║"
echo "║      Ask it: \"Get the AAPL stock quote\"         ║"
echo "║                                                  ║"
echo "║   Reference:                                     ║"
echo "║     curl https://api.kapit.dev/llms.txt          ║"
echo "║     curl https://api.kapit.dev/openapi.json      ║"
echo "║     https://api.kapit.dev/docs                   ║"
echo "╚══════════════════════════════════════════════════╝"
echo ""
