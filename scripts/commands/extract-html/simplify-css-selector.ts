// utils/cheerioHelpers.ts
import * as cheerio from 'cheerio';

export function cleanSelector(selector: string): string {
  return selector.replace(/:(hover|active|focus|nth-[a-z]+(\([^\)]+\))?)/g, '');
}

/**
 * Gets Cheerio elements matching a CSS selector in the given HTML.
 * @param selector - CSS selector to match the elements.
 * @param html - HTML string to search within.
 * @returns Cheerio object containing matched elements.
 */
export function getMatchedElements(selector: string, html: string): cheerio.Cheerio<any> {
  const $ = cheerio.load(html);
  try {
    // For example if we have the rule:
    // .foo:hover {
    // Then we want to still match the rule.
    return $(cleanSelector(selector));
  } catch (err) {
    return $('.no-match');
  }
}

/**
 * Simplifies a CSS selector based on the matched element.
 * @param originalSelector - The original CSS selector to simplify.
 * @param element - The Cheerio element matched by the selector.
 * @returns A simplified CSS selector string.
 */
export function simplifySelector(originalSelector: string, element: cheerio.Cheerio<any>): string {
  const transformedSelectors: string[] = [];

  console.log(`Processing selector: "${originalSelector}"`);

  const parts = originalSelector.trim().split(' '); // Split selector into parts by space
  let matched = false;

  console.log(`\nFor sub-selector: "${originalSelector}"`);

  while (parts.length > 0) {
    const testSelector = parts.join(' '); // Rejoin the parts into a test selector
    console.log(`Testing: "${testSelector}"`);

    // Check if the given element matches the test selector
    try {
      if (element.is(cleanSelector(testSelector))) {
        console.log(`Matched: "${testSelector}"`);
        transformedSelectors.push(testSelector); // Push the test selector if a match is found
        matched = true;
        break;
      } else {
        // Add this line to see what the function believes the element is:
        console.log(`Element did not match: "${testSelector}"`);
      }
    } catch (error) {
      console.error(`Error when trying to match "${testSelector}":`, (error as any).message);
    }

    parts.shift(); // Remove the leftmost part
  }

  // If the selector starts with ">", ensure that it targets a top-level element
  if (transformedSelectors.length > 0 && transformedSelectors[0].startsWith('>')) {
    transformedSelectors[0] = `:scope ${transformedSelectors[0]}`;
  }

  console.log(`Final selectors: "${transformedSelectors.join(', ')}"\n`);
  return transformedSelectors.join(', '); // Join the transformed selectors
}
