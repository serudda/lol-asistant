/**
 * Example script that could be used both locally and as a
 * cron job on Vercel.
 */

type SampleScriptOptions = {
  message?: string;
  timestamp?: boolean;
};

/**
 * A simple sample script that logs a message.
 *
 * @param options Configuration options.
 * @returns Object with status and message.
 */
export default async function sampleScript(
  options: SampleScriptOptions = {},
): Promise<{ status: string; message: string }> {
  const message = options.message ?? 'Hello from lol-assistant cron script!';

  // Sample logic that might do something useful
  console.log(`[SAMPLE SCRIPT] ${message}`);

  if (options.timestamp) {
    console.log(`[SAMPLE SCRIPT] Current time: ${new Date().toISOString()}`);
  }

  // In a real script, you might do something like:
  // - Fetch data from an API
  // - Process some data
  // - Update a database

  // Simulating some async operation
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    status: 'success',
    message: `Script executed successfully: ${message}`,
  };
}

// This allows the script to be run directly if needed
if (process.argv[1] === import.meta.url) {
  sampleScript({ timestamp: true })
    .then((result) => console.log(result))
    .catch((err) => console.error('Error running script:', err));
}
