// cssProcessor.ts
import postcss from 'postcss';
import { uniq } from 'lodash';
import { getMatchedElements, simplifySelector } from './simplify-css-selector';
import * as cheerio from 'cheerio';
import {
  extractElementFromLine,
  isInSubtree,
  extractSubtreeAndMatchedElements,
} from './element-extraction';

// Let's type our helper function arguments
function processRule(
  rule: postcss.Rule,
  parentRule: postcss.AtRule | null,
  originalHtml: string,
  component: cheerio.Cheerio<any>,
  document: cheerio.CheerioAPI,
  newRoot: postcss.Root,
) {
  const matchedElementsInOriginal = getMatchedElements(rule.selector, originalHtml);

  const matchedElementsInComponent = matchedElementsInOriginal.filter((_, element) => {
    const wrappedElement = document(element);
    return isInSubtree(document, wrappedElement, component);
  });

  const { newDocument, matchedElements } = extractSubtreeAndMatchedElements(
    document,
    component,
    matchedElementsInComponent,
  );

  const simplifiedSelectors = uniq(
    matchedElements.map((matchedElement) => {
      return simplifySelector(rule.selector, matchedElement);
    }),
  );

  simplifiedSelectors.map((selector) => {
    const newRule = rule.clone(); // clone the original rule
    newRule.selector = selector; // update the selector of the cloned rule

    if (parentRule) {
      // If there's a parent rule (media query), append it to that
      parentRule.append(newRule);
    } else {
      // If not, append directly to the new root
      newRoot.append(newRule);
    }
  });
}

/**
 * Processes the provided CSS in context of the given HTML and component line number.
 * @param css - The CSS string to process.
 * @param originalHtml - The HTML string where the CSS will be applied.
 * @param componentLine - The line number where the component starts in the HTML string.
 * @returns The processed CSS as a string.
 */
export function extractCss(
  css: string,
  originalHtml: string,
  componentLine: number,
): { extractedHtml: string; extractedCss: string } {
  const result = postcss().process(css, { from: undefined });

  if (!result.root) {
    throw new Error('Failed to parse CSS');
  }

  console.log('originalHtml', originalHtml);

  const matchedRulesAndElements: Array<{ rule: postcss.Rule; elements: cheerio.Cheerio<any> }> = [];

  const { document, subtree: component } = extractElementFromLine(originalHtml, componentLine);

  const newRoot = postcss.root();

  result.root.walkAtRules('media', (atRule) => {
    // If it's a media rule, process its children rules and append back the media query
    const newMediaRule = postcss.atRule({ name: 'media', params: atRule.params });

    atRule.each((childRule) => {
      if (childRule.type === 'rule') {
        processRule(childRule, newMediaRule, originalHtml, component!, document, newRoot);
      }
    });

    // Append the media rule to the root only if it has rules inside
    if (newMediaRule.nodes && newMediaRule.nodes.length > 0) {
      newRoot.append(newMediaRule);
    }
  });

  result.root.walkRules((rule) => {
    // For non-media rules, process them directly
    if (!rule.parent || rule.parent.type !== 'atrule') {
      processRule(rule, null, originalHtml, component!, document, newRoot);
    }
  });

  // The matchedRulesAndElements now only contains rules that match elements in the componentHtml.
  // We can later refine the selectors or do any other transformations.

  return {
    extractedCss: newRoot.toString(),
    extractedHtml: component!.toString(),
  };
}
