/**
 * Script runner that dynamically imports and executes a
 * script by name Usage: pnpm --filter.
 *
 * @lol-assistant/cron-scripts run start <script-name>
 * [arguments...]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const scriptsDir = path.join(__dirname, 'scripts');

/**
 * Main runner function.
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    listAvailableScripts();
    return;
  }

  const scriptName = args[0];

  // Ensure scriptName is defined
  if (!scriptName) {
    console.error('No script name provided');
    listAvailableScripts();
    process.exit(1);
  }

  // Convert remaining args to an options object (simple key=value parsing)
  const options = parseArgs(args.slice(1));

  try {
    await runScript(scriptName, options);
  } catch (error) {
    console.error(`Error running script "${scriptName}":`, error);
    process.exit(1);
  }
}

/**
 * Lists all available scripts in the scripts directory.
 */
function listAvailableScripts() {
  try {
    const files = fs.readdirSync(scriptsDir);
    const scriptFiles = files.filter((file) => file.endsWith('.ts') && !file.startsWith('_'));

    console.log('\nAvailable scripts:');
    scriptFiles.forEach((file) => {
      const scriptName = file.replace(/\.ts$/, '');
      console.log(`  - ${scriptName}`);
    });
    console.log('\nUsage: pnpm --filter @lol-assistant/cron-scripts run start <script-name> [key=value ...]');
  } catch (error) {
    console.error('Error listing scripts:', error);
  }
}

/**
 * Parses command line arguments into an options object.
 */
function parseArgs(args: string[]): Record<string, any> {
  const options: Record<string, any> = {};

  for (const arg of args) {
    if (arg.includes('=')) {
      // Ensure we have both key and value by checking the split result
      const parts = arg.split('=', 2);
      if (parts.length === 2) {
        const key = parts[0];
        const value = parts[1];

        if (key && value !== undefined) {
          // Try to parse as JSON if possible (for booleans, numbers, etc.)
          try {
            options[key] = JSON.parse(value);
          } catch {
            // If not valid JSON, keep as string
            options[key] = value;
          }
        }
      }
    } else {
      // Boolean flag (presence means true)
      options[arg] = true;
    }
  }

  return options;
}

/**
 * Dynamically imports and runs a script by name.
 */
async function runScript(scriptName: string, options: Record<string, any> = {}) {
  // Normalize script name (remove .ts extension if provided)
  const normalizedName = scriptName.replace(/\.ts$/, '');

  // We need to access default export via ESM dynamic import
  console.log(`Running script: ${normalizedName}`);
  console.log(`Options:`, options);

  try {
    // For ts-node dynamic imports, we need to construct the path more carefully
    // This will work with --experimental-specifier-resolution=node
    const scriptPath = `./scripts/${normalizedName}`;
    console.log(`Attempting to load script from: ${scriptPath}`);

    const module = await import(scriptPath);

    if (typeof module.default !== 'function') {
      throw new Error(`Script "${normalizedName}" does not export a default function`);
    }

    console.log(`\n--- Script Output ---`);
    const result = await module.default(options);
    console.log(`\n--- Result ---`);
    console.log(result);

    return result;
  } catch (error: any) {
    if (error.code === 'ERR_MODULE_NOT_FOUND') {
      console.error(`Script "${normalizedName}" not found. Available scripts:`);
      listAvailableScripts();
    } else {
      console.error(`Error in script "${normalizedName}":`, error);
    }
    throw error;
  }
}

// Run the main function
main().catch((err) => {
  console.error('Unhandled error:', err);
  process.exit(1);
});
