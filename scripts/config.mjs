import fs from 'fs';

const initializeSettings = () => {
  fs.copyFileSync("scripts/settings.template.json", ".vscode/settings.json")
  console.log("Settings initialized!")
}

if (!fs.existsSync(".vscode/settings.json")) {
  console.log("No settings.json found, creating initial settings...")
  initializeSettings()
} else {
  console.log("VS Code settings detected, skipping settings config.")
}
