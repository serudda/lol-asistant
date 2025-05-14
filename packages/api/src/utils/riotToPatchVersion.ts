/**
 * Converts a Riot patch version (e.g. "25-10") to canonical
 * format (e.g. "15.10.1"). Throws if the format is not
 * recognized or if groups are missing.
 */
export function riotToPatchVersion(riotPatch: string): string {
  const match = /^([0-9]+)-([0-9]+)$/.exec(riotPatch);
  if (!match) throw new Error(`Invalid Riot patch format: ${riotPatch}`);

  // Ensure both groups exist
  const majorStr = match[1];
  const minorStr = match[2];
  if (typeof majorStr !== 'string' || typeof minorStr !== 'string') {
    throw new Error(`Patch regex did not capture both groups: ${riotPatch}`);
  }

  const riotMajor = parseInt(majorStr, 10);
  const minor = parseInt(minorStr, 10);
  if (isNaN(riotMajor) || isNaN(minor)) {
    throw new Error(`Patch version numbers are not valid: ${riotPatch}`);
  }
  const canonicalMajor = riotMajor - 10;

  return `${canonicalMajor}.${minor}.1`;
}

/*
Example usage:
riotToPatchVersion('25-10'); // Output: "15.10.1"
*/
