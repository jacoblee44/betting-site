// elementHandler.ts
import * as cheerio from 'cheerio';
import { CheerioAPI, Cheerio } from 'cheerio';

/**
 * Given an HTML string and a line number, this function extracts the Cheerio element
 * that opens at that line number and the full parsed document.
 *
 * @param html - The HTML string.
 * @param lineNumber - The line number to inspect.
 * @returns An object containing the full parsed document and the located element (or null if no element is found).
 */
export function extractElementFromLine(
  html: string,
  lineNumber: number,
): { document: CheerioAPI; subtree: Cheerio<any> | null } {
  // Split the HTML into lines.
  const lines = html.split('\n');

  // Ensure the line number is valid.
  if (lineNumber < 1 || lineNumber > lines.length) {
    throw new Error('Invalid line number');
  }

  // Start from the given line number and find the next opening tag.
  let tag: string | null = null;
  for (let i = lineNumber - 1; i < lines.length; i++) {
    const match = lines[i].match(/<\s*([a-z][a-z0-9]*)\b/i); // Find an opening tag.
    if (match) {
      tag = match[1];
      break;
    }
  }

  // Parse the HTML using Cheerio.
  const $ = cheerio.load(html);

  if (!tag) {
    return { document: $, subtree: null };
  }

  // Find the first instance of the tag starting from the given line.
  for (let i = lineNumber - 1; i < lines.length; i++) {
    if (lines[i].includes(`<${tag}`)) {
      const beforeTag = lines.slice(0, i).join('\n');
      const countBefore = (beforeTag.match(new RegExp(`<${tag}`, 'gi')) || []).length;

      return { document: $, subtree: $(tag).eq(countBefore) };
    }
  }

  return { document: $, subtree: null };
}

/**
 * Checks if a descendant is within a given ancestor in the document tree.
 * @param document - The loaded Cheerio document.
 * @param descendant - The descendant element to check.
 * @param ancestor - The ancestor element to check against.
 * @returns True if the descendant is within the ancestor, false otherwise.
 */
export function isInSubtree(
  document: CheerioAPI,
  descendant: Cheerio<any>,
  ancestor: Cheerio<any>,
): boolean {
  let current = descendant;
  const ancestorHtml = document.html(ancestor);
  while (current.length) {
    if (document.html(current) === ancestorHtml) {
      return true;
    }
    current = current.parent();
  }
  return false;
}

/**
 * Generates a CSS selector path for an element relative to a given subtree.
 */
function getElementPathRelativeToSubtree(
  subtree: Cheerio<any>,
  element: cheerio.Cheerio<any>,
): string {
  let path: string[] = [];
  let currentElement = element;

  while (
    currentElement &&
    currentElement.length &&
    currentElement.toString() !== subtree.toString()
  ) {
    const allSiblings = currentElement.parent().children(); // get all siblings
    let index = allSiblings.toArray().indexOf(currentElement[0]) + 1; // index among all siblings
    path.unshift(`:nth-child(${index})`);

    currentElement = currentElement.parent();
  }

  path.unshift(`:nth-child(1)`);

  return path.join(' > ');
}

/**
 * Extracts the subtree and matched elements based on the given element paths.
 * @param document - The loaded Cheerio document.
 * @param subtree - The Cheerio element representing the subtree.
 * @param elementsToMatch - Elements to find matches for within the new document.
 * @returns An object with the new document and matched elements.
 */
export function extractSubtreeAndMatchedElements(
  document: CheerioAPI,
  subtree: Cheerio<any>,
  elementsToMatch: Cheerio<any>,
): { newDocument: CheerioAPI; matchedElements: Cheerio<any>[] } {
  const newDocument = cheerio.load(subtree.toString() || '');

  const matchedElementsInNewDoc: cheerio.Cheerio<any>[] = [];

  elementsToMatch.each((_index, element) => {
    console.log('Matching Element HTML:', document(element).html()); // Debug: Print the matching element's HTML
    const elementPath = getElementPathRelativeToSubtree(subtree, document(element));
    console.log('Generated Element Path:', elementPath); // Debug: Print the generated path for the element

    const correspondingElement = newDocument('body > ' + elementPath); // Prefix with 'body > ' to bypass the added body tag
    console.log('new document!', newDocument.html());
    console.log('Corresponding Element in New Doc:', correspondingElement.html()); // Debug: Print the corresponding element's HTML in the new doc

    if (correspondingElement.length > 0) {
      matchedElementsInNewDoc.push(correspondingElement);
    }
  });

  return {
    newDocument,
    matchedElements: matchedElementsInNewDoc,
  };
}
