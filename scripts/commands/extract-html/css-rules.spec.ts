import {
  extractElementFromLine,
  isInSubtree,
  extractSubtreeAndMatchedElements,
} from './element-extraction'; // replace with your file path
import { simplifySelector } from './simplify-css-selector';
import { extractCss } from './css-extractor';

import cheerio from 'cheerio';

function stripExtraSpaces(str: string) {
  // Remove spaces between tags
  return str.replace(/>\s+</g, '><').trim();
}

function normalizeHTML(html: string): string {
  return stripExtraSpaces(html.replace(/\s+/g, ' ')).trim();
}

describe('CSS Processor Utilities', () => {
  describe('extractElementFromLine', () => {
    it('should extract correct element by line number', () => {
      const html = `
        <div>
          <p>Hello World</p>
        </div>
      `;
      const { subtree } = extractElementFromLine(html, 3);
      expect(cheerio.html(subtree!)).toEqual('<p>Hello World</p>');
    });

    it('should throw an error for invalid line numbers', () => {
      const html = '<p>Hello World</p>';
      expect(() => extractElementFromLine(html, 10)).toThrow('Invalid line number');
    });
  });

  describe('isInSubtree', () => {
    it('should return true if element is in the subtree', () => {
      const html = '<div><span>Hello</span></div>';
      const $ = cheerio.load(html);
      const result = isInSubtree($, $('span'), $('div'));
      expect(result).toBeTruthy();
    });

    it('should return false if element is not in the subtree', () => {
      const html = '<div></div><span>Hello</span>';
      const $ = cheerio.load(html);
      const result = isInSubtree($, $('span'), $('div'));
      expect(result).toBeFalsy();
    });
  });

  describe('simplifySelector', () => {
    it('should simplify the selector correctly', () => {
      const html = '<div class="test"><span>Hello</span></div>';
      const $ = cheerio.load(html);
      const selector = simplifySelector('.no-match span', $('span'));
      expect(selector).toEqual('span');
    });
    it('should simplify the second selector correctly', () => {
      const html = '<html><head></head><body><p class="text">Sample Text</p></body></html>';
      const $ = cheerio.load(html);
      const selector = simplifySelector('.container .text', $('p'));
      expect(selector).toEqual('.text');
    });
    it('should simplify .btn-643 correctly', () => {
      const html = `
          <div data-v-0bd92c0a class="content-7cb">
              <div data-v-0bd92c0a class="text-x8l button-yvk">
                  <a data-v-0bd92c0a href="https://horse24.com/en/auctions/details/verden-stallion-licensing-2023-dressage-stallions-307" class="btn-643">View lots</a>
              </div>
          </div>
      `;

      const $ = cheerio.load(html);
      const element = $('.btn-643');
      const selector = simplifySelector('.btn-643', element);

      expect(selector).toEqual('.btn-643');
    });
  });

  describe('processCss', () => {
    it('should process CSS correctly', () => {
      const css = '.container .text { font-size: 16px; }';
      const html = `
        <div class="container">
          <div class="foo">
            <p class="text">Sample Text</p>
          </div>
        </div>
      `;
      const processedCss = extractCss(css, html, 3).extractedCss;
      // This is a basic expectation. You might want to expand on what you expect the processedCss to be.
      console.log('final css', processedCss);
      expect(processedCss).not.toContain('.container');
      expect(processedCss).toContain('.text');
    });

    it('should correctly process CSS based on given HTML content', () => {
      // Example HTML and CSS content
      const originalHtml = `
      <div class="company-cze lazy-mbx style-OPYEw" id="style-OPYEw">
        <div class="info-c5t">
          <div class="info-d68">
            <div class="row-9dw content-62f">
              <span class="test">Hello</span>
            </div>
          </div>
        </div>
      </div>
    `;

      const cssContent = `
      .company-cze .info-c5t .info-d68 .row-9dw {
        -webkit-box-flex: 1;
        -webkit-flex: auto;
        -moz-box-flex: 1;
        -ms-flex: auto;
        flex: auto;
      }

      .row-9dw > span {
        color: red;
      }
    `;

      const expectedProcessedCss = `
      .row-9dw {
        -webkit-box-flex: 1;
        -webkit-flex: auto;
        -moz-box-flex: 1;
        -ms-flex: auto;
        flex: auto;
      }

      .row-9dw > span {
        color: red;
      }`;
      const processedCss = extractCss(cssContent, originalHtml, 5).extractedCss;

      expect(processedCss).toBe(expectedProcessedCss);
    });
  });

  describe('extractSubtreeAndMatchedElements', () => {
    it('should correctly extract subtree and match elements', () => {
      // Sample HTML
      const html = `
        <html>
          <body>
            <div class="container">
              <p class="item">Item 1</p>
              <p class="item">Item 2</p>
              <span>Other</span>
            </div>
            <p class="outside">Outside</p>
          </body>
        </html>
      `;

      const document = cheerio.load(html);
      const subtree = document('.container');
      const elementsToMatch = document('.item');

      const { newDocument, matchedElements } = extractSubtreeAndMatchedElements(
        document,
        subtree,
        elementsToMatch,
      );

      // Check newDocument content
      expect(normalizeHTML(newDocument.html())).toBe(
        normalizeHTML(
          `<html><head></head><body><div class="container"><p class="item">Item 1</p><p class="item">Item 2</p><span>Other</span></div></body></html>`,
        ),
      );

      // Check matchedElements content
      expect(matchedElements.length).toBe(2);
      expect(matchedElements[0].html()).toBe('Item 1');
      expect(matchedElements[1].html()).toBe('Item 2');
    });

    it('should correctly handle :nth-child selectors regardless of element type', () => {
      // Sample HTML with mixed types
      const html = `
        <html>
          <body>
            <div class="container">
              <span></span>
              <p class="item">Item 1</p>
              <span></span>
              <p class="item">Item 2</p>
              <span>Other</span>
            </div>
            <p class="outside">Outside</p>
          </body>
        </html>
      `;

      const document = cheerio.load(html);
      const subtree = document('.container');
      const elementsToMatch = document('.item');

      const { newDocument, matchedElements } = extractSubtreeAndMatchedElements(
        document,
        subtree,
        elementsToMatch,
      );

      // Check newDocument content
      expect(normalizeHTML(newDocument.html())).toBe(
        normalizeHTML(
          `<html><head></head><body><div class="container"><span></span><p class="item">Item 1</p><span></span><p class="item">Item 2</p><span>Other</span></div></body></html>`,
        ),
      );

      // Check matchedElements content
      expect(matchedElements.length).toBe(2);
      expect(matchedElements[0].html()).toBe('Item 1');
      expect(matchedElements[1].html()).toBe('Item 2');
    });

    it('should correctly handle extraction of elements with siblings', () => {
      // Sample HTML with siblings for the subtree root
      const html = `
        <html>
          <body>
            <div></div>
            <div class="container">
              <span></span>
              <p class="item">Item 1</p>
              <span></span>
              <p class="item">Item 2</p>
              <span>Other</span>
            </div>
            <div></div>
          </body>
        </html>
      `;

      const document = cheerio.load(html);
      const subtree = document('.container');
      const elementsToMatch = document('.item');

      const { newDocument, matchedElements } = extractSubtreeAndMatchedElements(
        document,
        subtree,
        elementsToMatch,
      );

      // Check newDocument content
      expect(normalizeHTML(newDocument.html())).toBe(
        normalizeHTML(
          `<html><head></head><body><div class="container"><span></span><p class="item">Item 1</p><span></span><p class="item">Item 2</p><span>Other</span></div></body></html>`,
        ),
      );

      // Check matchedElements content
      expect(matchedElements.length).toBe(2);
      expect(matchedElements[0].html()).toBe('Item 1');
      expect(matchedElements[1].html()).toBe('Item 2');
    });
  });
});
