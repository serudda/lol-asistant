import axios from 'axios';

/**
 * Fetches HTML content from a given URL.
 *
 * @param url - The URL to fetch HTML from.
 * @returns The HTML content as a string.
 */
export const getHtmlFromPage = async (url: string, headers?: Record<string, string>): Promise<string> => {
  try {
    console.log(`[HTML] Fetching content from: ${url}`);
    const { data: html } = await axios.get(url, { headers });
    console.log(`[HTML] Successfully fetched content`);

    return html;
  } catch (error) {
    console.error('[HTML] Error fetching content:', error);
    throw error;
  }
};
