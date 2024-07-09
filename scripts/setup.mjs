#!/usr/bin/env node

import fs from 'fs'

if (!fs.existsSync('.vscode/settings.json')) {
  console.log('No settings.json found, creating initial settings...')
  fs.copyFileSync('scripts/settings.template.json', '.vscode/settings.json')
  console.log('Settings initialized!')
} else {
  console.log('VS Code settings detected, skipping settings config.')
}
